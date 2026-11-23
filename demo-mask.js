/* 演示脱敏：仅当 URL 带 demo=1 时生效。
 * 目的：作品演示中不使用任何真实经营数据；日常直接访问原站不受影响。
 * 必须在 adstat-data-embedded.js 之后、主脚本之前加载。 */
(function () {
  try {
    var isDemo = /(?:^|[?&])demo=1(?:[&#]|$)/.test(location.search + location.hash.replace('#', '&'));
    if (!isDemo) return;

    /* ---------- 工具 ---------- */
    function hashStr(s) {
      var h = 2166136261;
      for (var i = 0; i < s.length; i++) { h ^= s.charCodeAt(i); h = Math.imul(h, 16777619); }
      return h >>> 0;
    }
    function scrambleNum(n, key) {
      if (typeof n !== 'number' || !isFinite(n)) return n;
      if (n === 0) return 0;
      var h = hashStr(String(key));
      var f = 0.62 + ((h % 90) / 100);
      var bump = (h >>> 9) % 13;
      var neg = n < 0 ? -1 : 1;
      var a = Math.abs(n);
      if (a >= 100) return neg * (Math.round(a * f) + bump);
      if (a >= 10) return neg * Number((a * f).toFixed(1));
      if (Number.isInteger(a)) return neg * (a + bump);
      var v = (a * (0.72 + ((h % 45) / 100))) % 1;
      v = Math.max(0.003, Math.min(0.987, v));
      var dec = (String(a).split('.')[1] || '').length;
      return neg * Number(v.toFixed(Math.min(6, Math.max(2, dec))));
    }
    var FAKE = [
      '持续推进重点场景的体验优化，按周跟踪关键节点。',
      '本周完成重点物料的迭代与投放验证，链路表现平稳。',
      '结合渠道反馈调整了触达节奏，后续继续观察转化变化。',
      '素材侧完成多轮对比测试，优胜版本已同步到日常投放。',
      '围绕核心人群做了分层运营，配合活动节奏稳步推进。',
      '对低效环节做了排查与收敛，整体流程保持可控。',
      '复盘结论：保持现有节奏，重点跟进下周的关键动作。'
    ];
    var CONTENT_KEY = /(?:^|[_-])(note|notes|review|summary|content|text|desc|description|comment|remarks?|headline|article|news|body|quote|risknote|marketemotion|moneyeffect|detail|hint|advice|suggestion|audience|title|copy)(?:$|[_-])/i;
    function shiftDate(y, m, d) {
      var dt = new Date(Date.UTC(+y, +m - 1, +d));
      dt.setUTCDate(dt.getUTCDate() - 400);
      return dt;
    }
    function scrambleStr(s, key) {
      if (typeof s !== 'string') return s;
      var dm = s.match(/^(\d{4})([-/])(\d{1,2})\2(\d{1,2})(.*)$/);
      if (dm) {
        var dt = shiftDate(dm[1], dm[3], dm[4]);
        var p = function (x) { return x < 10 ? '0' + x : '' + x; };
        return dt.getUTCFullYear() + dm[2] + p(dt.getUTCMonth() + 1) + dm[2] + p(dt.getUTCDate()) + dm[5];
      }
      if (/^\d{5,}$/.test(s)) return s.split('').map(function (c) { return String((+c + 3) % 10); }).join('');
      if (CONTENT_KEY.test(key) && s.length > 6 && !/^https?:/.test(s)) {
        return FAKE[hashStr(key + s) % FAKE.length];
      }
      return s;
    }
    function scrub(v, key, seen) {
      if (v === null || v === undefined) return v;
      if (typeof v === 'number') return scrambleNum(v, key);
      if (typeof v === 'string') return scrambleStr(v, key);
      if (typeof v !== 'object') return v;
      if (seen.indexOf(v) !== -1) return v;
      seen.push(v);
      if (Array.isArray(v)) {
        for (var i = 0; i < v.length; i++) v[i] = scrub(v[i], key + '[]', seen);
      } else {
        for (var k in v) {
          if (Object.prototype.hasOwnProperty.call(v, k)) v[k] = scrub(v[k], k, seen);
        }
      }
      return v;
    }

    /* ---------- 1) 主数据对象脱敏 ---------- */
    if (window.ADSTAT_DATA) scrub(window.ADSTAT_DATA, 'data', []);

    /* ---------- 2) 屏蔽本地真实笔记 / 文档缓存 ---------- */
    var BLOCK = /(?:^|[-_])(note|notes|review|reviewdocs|copywriting|officialarticle|publishrecords|newspref|newsstore)(?:$|[-_])/i;
    try {
      var toDel = [];
      for (var i = 0; i < localStorage.length; i++) {
        var kk = localStorage.key(i);
        if (kk && BLOCK.test(kk)) toDel.push(kk);
      }
      toDel.forEach(function (k) { try { localStorage.removeItem(k); } catch (e) {} });
      var origGet = Storage.prototype.getItem;
      Storage.prototype.getItem = function (k) {
        if (typeof k === 'string' && BLOCK.test(k)) return null;
        return origGet.apply(this, arguments);
      };
      var origSet = Storage.prototype.setItem;
      Storage.prototype.setItem = function (k, v) {
        if (typeof k === 'string' && BLOCK.test(k)) return;
        return origSet.apply(this, arguments);
      };
    } catch (e) {}

    /* ---------- 3) 隐藏「今日备注 / 复盘记录」与资讯中的真实文案区 ---------- */
    function hideBlocks() {
      var hs = document.querySelectorAll('h3,h2,.news-title');
      for (var i = 0; i < hs.length; i++) {
        var t = (hs[i].textContent || '').trim();
        if (/今日备注|复盘记录|复盘总结/.test(t)) {
          var b = hs[i].parentNode;
          if (b && b.style) b.style.display = 'none';
        }
      }
    }
    if (document.readyState === 'loading') document.addEventListener('DOMContentLoaded', hideBlocks);
    else hideBlocks();
    var css = document.createElement('style');
    css.textContent = '#reportAutoReview,#reportNote,.report-note-actions{display:none!important}';
    (document.head || document.documentElement).appendChild(css);

    /* ---------- 4) DOM 文本兜底：替换运行时拼装的长中文话术 ---------- */
    var REPL = [
      '持续优化重点场景的呈现与链路，围绕关键节点稳步推进。',
      '本周完成重点物料的迭代与效果验证，整体表现保持平稳。',
      '结合渠道反馈调整触达节奏，后续继续观察转化变化。',
      '素材侧完成多轮对比测试，优胜版本已同步到日常投放。',
      '围绕核心人群开展分层运营，配合活动节奏有序推进。',
      '对低效环节完成排查与收敛，整体流程保持在可控范围。',
      '复盘结论：维持现有节奏，重点跟进下一阶段的关键动作。'
    ];
    function sweep() {
      var walker = document.createTreeWalker(document.body, NodeFilter.SHOW_TEXT, null, false);
      var nodes = [], n;
      while ((n = walker.nextNode())) nodes.push(n);
      for (var i = 0; i < nodes.length; i++) {
        var t = nodes[i].nodeValue || '';
        if (t.length < 16 || !/[\u4e00-\u9fa5]/.test(t)) continue;
        if (!/[，。；：、]/.test(t)) continue;
        var el = nodes[i].parentElement;
        if (el && /^(SCRIPT|STYLE|BUTTON|A|SELECT|OPTION)$/.test(el.tagName || '')) continue;
        nodes[i].nodeValue = REPL[hashStr(t) % REPL.length];
      }
    }
    if (document.readyState === 'loading') document.addEventListener('DOMContentLoaded', function(){ setTimeout(sweep, 400); });
    else setTimeout(sweep, 400);
    setTimeout(sweep, 3500);
  } catch (e) { /* 脱敏失败不应阻断演示 */ }
})();
