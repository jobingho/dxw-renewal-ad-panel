(function () {
  function keepBlueThemeLast() {
    var orange = document.getElementById('orange-sidebar-lock-link');
    if (orange && orange.parentNode) orange.parentNode.removeChild(orange);
    var href = 'blue-glass-ui-override.css';
    var blue = Array.prototype.slice.call(document.querySelectorAll('link[rel="stylesheet"]')).find(function (link) {
      return (link.getAttribute('href') || '').indexOf(href) !== -1;
    });
    if (!blue) {
      blue = document.createElement('link');
      blue.rel = 'stylesheet';
      blue.href = href;
    }
    if (blue.parentNode !== document.head || blue !== document.head.lastElementChild) {
      if (blue.parentNode) blue.parentNode.removeChild(blue);
      document.head.appendChild(blue);
    }
    document.documentElement.dataset.theme = 'blueGlass';
    if (document.body) document.body.classList.add('blue-glass-ui');
  }

  function item(view, icon, label, extra) {
    var isParent = (extra || '').indexOf('nav-parent') !== -1;
    return '<div class="nav-item ' + (extra || '') + '" data-view-nav="' + view + '"><span class="nav-ico ' + icon + '"></span><span>' + label + '</span>' + (isParent ? '<button class="nav-toggle" type="button" aria-label="expand" aria-expanded="false"></button>' : '') + '</div>';
  }

  function sub(view, label) {
    return '<div class="nav-subitem" data-view-nav="' + view + '"><span class="sub-ico ico-data"></span><span>' + label + '</span></div>';
  }

  function applyNav() {
    var rail = document.querySelector('.side-rail');
    var brand = document.querySelector('.side-brand');
    if (!rail || rail.dataset.blueFullNav === '1') return;
    rail.dataset.blueFullNav = '1';
    if (brand) {
      brand.innerHTML = '<span class="blue-brand-mark"></span><span class="blue-brand-copy"><strong>Jobingho &#x7684;&#x5de5;&#x4f5c;&#x7a7a;&#x95f4;</strong><small>&#x65e9;&#x4e0a;&#x597d;&#xff01;&#x65b0;&#x7684;&#x4e00;&#x5929;&#x52aa;&#x529b;&#x5de5;&#x4f5c;</small></span>';
    }
    Array.prototype.slice.call(rail.children).forEach(function (child) {
      if (child !== brand) child.remove();
    });
    rail.insertAdjacentHTML('beforeend',
      item('workbench', 'ico-workbench', '&#x9996;&#x9875;', 'active') +
      item('project', 'ico-project', '&#x9879;&#x76ee;&#x7ba1;&#x7406;', 'nav-parent expanded') +
      '<div class="nav-subgroup open">' + sub('activityCalendar', '&#x6d3b;&#x52a8;&#x65e5;&#x5386;') + sub('document', '&#x590d;&#x76d8;&#x6587;&#x6863;') + sub('material', '&#x7d20;&#x6750;&#x5e93;') + '</div>' +
      item('data', 'ico-data', '&#x6570;&#x636e;&#x7edf;&#x8ba1;', 'nav-parent expanded') +
      '<div class="nav-subgroup open">' + sub('data', '&#x6570;&#x636e;&#x603b;&#x8868;') + sub('dailyReport', '&#x65e5;&#x62a5;&#x8868;') + sub('weeklyReport', '&#x5468;&#x62a5;&#x8868;') + sub('monthlyReport', '&#x6708;&#x62a5;&#x8868;') + '</div>' +
      item('strategy', 'ico-auto', '&#x6295;&#x653e;&#x7b56;&#x7565;', 'nav-parent expanded') +
      '<div class="nav-subgroup open">' + sub('automation', '&#x5e7f;&#x544a;&#x81ea;&#x52a8;&#x5316;') + sub('experience', '&#x6295;&#x653e;&#x7ecf;&#x9a8c;') + '</div>' +
      item('newsFlash', 'ico-news', '&#x5185;&#x5bb9;&#x8fd0;&#x8425;', 'nav-parent expanded') +
      '<div class="nav-subgroup open">' + sub('newsFlash', '&#x8d44;&#x8baf;&#x5feb;&#x62a5;') + sub('copywriting', '&#x6587;&#x6848;&#x751f;&#x6210;') + '</div>' +
      item('officialAccount', 'ico-auto', '&#x516c;&#x4f17;&#x53f7;', 'nav-parent') +
      '<div class="nav-subgroup">' + sub('officialAccount', '&#x81ea;&#x52a8;&#x5316;&#x4f20;&#x6587;&#x7ae0;') + '</div>' +
      item('risk', 'ico-risk', '&#x98ce;&#x63a7;&#x5ba1;&#x6279;') +
      item('settings', 'ico-settings', '&#x7cfb;&#x7edf;&#x8bbe;&#x7f6e;')
    );
    Array.prototype.slice.call(document.querySelectorAll('[data-view-nav]')).forEach(function (nav) {
      nav.addEventListener('click', function (event) {
        if (event.target && event.target.closest && event.target.closest('.nav-toggle')) return;
        var id = nav.getAttribute('data-view-nav');
        var isParent = nav.classList.contains('nav-parent');
        var group = isParent ? nav.nextElementSibling : null;
        if (isParent && group && group.classList.contains('nav-subgroup')) {
          group.classList.toggle('open');
          nav.classList.toggle('expanded', group.classList.contains('open'));
          nav.setAttribute('aria-expanded', group.classList.contains('open') ? 'true' : 'false');
        } else {
          openBlueView(id);
        }
      });
    });
    Array.prototype.slice.call(document.querySelectorAll('.nav-toggle')).forEach(function (toggle) {
      toggle.addEventListener('click', function (event) {
        event.preventDefault();
        event.stopPropagation();
        var parent = toggle.closest('.nav-parent');
        var group = parent ? parent.nextElementSibling : null;
        if (!group || !group.classList.contains('nav-subgroup')) return;
        var open = group.classList.toggle('open');
        parent.classList.toggle('expanded', open);
        toggle.setAttribute('aria-expanded', open ? 'true' : 'false');
      });
    });
    if (typeof window.hydrateIcons === 'function') {
      try { window.hydrateIcons(); } catch (e) {}
    }
  }
  function ensureActivityCalendarAssets() {
    if (!document.querySelector('link[href*="assets/activity-calendar.css"]')) {
      var link = document.createElement('link');
      link.rel = 'stylesheet';
      link.href = 'assets/activity-calendar.css?v=restore-full-blue-20260710-01';
      document.head.appendChild(link);
    }
    if (!document.querySelector('script[src*="assets/activity-calendar.js"]')) {
      var script = document.createElement('script');
      script.src = 'assets/activity-calendar.js?v=restore-full-blue-20260710-01';
      script.onload = function () { if (typeof window.renderActivityCalendar === 'function') window.renderActivityCalendar(); };
      document.body.appendChild(script);
    } else if (typeof window.renderActivityCalendar === 'function') {
      setTimeout(window.renderActivityCalendar, 30);
    }
  }

  function ensureActivityCalendarView() {
    var view = document.getElementById('view-activityCalendar');
    if (!view) {
      view = document.createElement('div');
      view.id = 'view-activityCalendar';
      view.className = 'view';
      var main = document.querySelector('main');
      if (main) main.appendChild(view);
    }
    if (!view.dataset.fullCalendarShell) {
      view.dataset.fullCalendarShell = '1';
      view.innerHTML = '<section class="activity-page-shell" id="activityCalendar">' +
        '<div class="activity-date-overview"><div class="date-tile"><span id="dateInfoWeekday">星期五</span><strong id="dateInfoDay">10</strong></div><div class="date-main"><h3 id="dateInfoMonth">2026年7月</h3><p id="dateInfoMeta">第191天，第28周</p><p id="dateInfoToday">今天</p></div><div class="date-topic"><strong id="dateInfoTopic">世界杯</strong><span id="dateInfoTopicText">精彩小游戏，畅享世界杯</span></div><div class="date-cup"><span id="dateInfoYear">2026</span></div></div>' +
        '<div class="activity-calendar-card activity-calendar-poster"><div class="calendar-head"><div><h2 class="calendar-title">2026年7月活动排期</h2><p class="settings-note" id="calendarCaption">2026-07-01 至 2026-07-31，当前显示 8 个活动</p></div><div class="calendar-toolbar"><button type="button" id="calendarPrev">‹</button><button type="button" id="calendarToday">今天</button><button type="button" id="calendarNext">›</button><select id="calendarViewMode"><option value="month" selected>月视图</option><option value="week">周视图</option><option value="day">日视图</option><option value="range7">7天视图</option><option value="twoMonths">双月视图</option><option value="agenda">列表视图</option><option value="custom">自定义</option></select><span class="calendar-date-range" id="calendarDateRange"><input id="calendarStart" type="date" value="2026-07-01"><input id="calendarEnd" type="date" value="2026-07-31"></span><input id="calendarSearch" placeholder="搜索活动/参与人"><button class="primary" type="button" id="calendarCreate">创建活动</button><button type="button" id="calendarSettings">设置</button></div></div><div class="calendar-stats" id="calendarStats"></div><div class="calendar-layout"><div><div class="calendar-weekdays" id="calendarWeekdays"></div><div class="calendar-view" id="calendarView"></div></div><aside class="calendar-panel"><div class="calendar-sidebox calendar-countdown" id="calendarCountdown"></div><div class="calendar-sidebox"><h4>今日待办联动</h4><div class="calendar-side-list" id="calendarTodoLink"></div></div><div class="calendar-sidebox"><h4>活动归档</h4><div class="calendar-archive" id="calendarArchive"></div></div><div class="calendar-sidebox"><h4>操作日志</h4><div class="calendar-log-list" id="calendarLog"></div></div></aside></div></div>' +
        '<div class="activity-lunar-footer"><div><strong id="lunarInfoTitle">农历</strong><span id="lunarInfoGanzhi">丙午年</span></div><div class="lunar-tags"><p><b class="good">宜</b><span id="lunarGood">开市 交易</span></p><p><b class="bad">忌</b><span id="lunarBad">动土 入宅</span></p></div></div>' +
        '<button class="calendar-fab" id="calendarFab" type="button">+</button>' +
        '<div class="calendar-modal-overlay" id="calendarModal"><div class="calendar-modal"><h3 id="calendarModalTitle">创建活动</h3><div class="calendar-form"><label>标题<input id="calTitle"></label><label>分类<select id="calCategory"><option>短线王续费</option><option>短线王新开</option><option>倒计时</option><option>执行待办</option></select></label><label>开始日期<input id="calStartDate" type="date"></label><label>结束日期<input id="calEndDate" type="date"></label><label>开始时间<input id="calStartTime" type="time"></label><label>结束时间<input id="calEndTime" type="time"></label><label>状态<select id="calStatus"><option>未开始</option><option>进行中</option><option>已完成</option><option>延期</option></select></label><label>提醒<select id="calReminder"><option value="0">不提醒</option><option value="30">提前30分钟</option><option value="1440">提前1天</option></select></label><label>地点<input id="calLocation"></label><label>参与人<input id="calPeople"></label><label>附件数<input id="calFiles" type="number" min="0" value="0"></label><label><input id="calAllDay" type="checkbox"> 全天</label><label><input id="calArchived" type="checkbox"> 归档</label><label class="span-2">颜色<div class="calendar-color-row" id="calColorRow"></div></label><label class="span-2">备注<textarea id="calNote"></textarea></label></div><div class="calendar-modal-actions"><button type="button" id="calDelete">删除</button><button type="button" id="calCancel">取消</button><button class="primary" type="button" id="calSave">保存</button></div></div></div>' +
        '<div class="calendar-modal-overlay" id="calendarSettingsModal"><div class="calendar-modal"><h3>日历设置</h3><div class="calendar-settings-grid"><label><input id="setLunar" type="checkbox"> 显示农历</label><label><input id="setWeekNo" type="checkbox"> 显示周数</label><label><input id="setHoliday" type="checkbox"> 显示节气/休息日</label><label><input id="setCompact" type="checkbox"> 紧凑模式</label></div><div class="calendar-modal-actions"><button type="button" id="calendarSettingsClose">取消</button><button class="primary" type="button" id="calendarSettingsSave">保存设置</button></div></div></div>' +
        '</section>';
    }
    ensureActivityCalendarAssets();
    return view;
  }
  function ensureView(id, title) {
    var view = document.getElementById('view-' + id);
    if (!view) {
      view = document.createElement('div');
      view.id = 'view-' + id;
      view.className = 'view';
      var main = document.querySelector('main');
      if (main) main.appendChild(view);
    }
    if (view && !view.innerHTML && title) {
      view.innerHTML = '<section class="placeholder-page"><div class="placeholder-head"><div><h2 class="placeholder-title">' + title + '</h2><p class="settings-note">&#x8be5;&#x6a21;&#x5757;&#x6b63;&#x5728;&#x89c4;&#x5212;&#x4e2d;&#xff0c;&#x540e;&#x7eed;&#x63a5;&#x5165;&#x771f;&#x5b9e;&#x6570;&#x636e;&#x548c;&#x53ef;&#x64cd;&#x4f5c;&#x6d41;&#x7a0b;&#x3002;</p></div></div></section>';
    }
    return view;
  }

  function openBlueView(id) {
    if (id === 'calendar') id = 'activityCalendar';
    if (id === 'activityCalendar') ensureActivityCalendarView();
    ensureView('project', '&#x9879;&#x76ee;&#x7ba1;&#x7406;');
    ensureView('document', '&#x590d;&#x76d8;&#x6587;&#x6863;');
    ensureView('material', '&#x7d20;&#x6750;&#x5e93;');
    ensureView('strategy', '&#x6295;&#x653e;&#x7b56;&#x7565;');
    ensureView('experience', '&#x6295;&#x653e;&#x7ecf;&#x9a8c;');
    ensureView('risk', '&#x98ce;&#x63a7;&#x5ba1;&#x6279;');
    if (typeof window.switchView === 'function') {
      window.switchView(id);
    } else {
      Array.prototype.slice.call(document.querySelectorAll('.view')).forEach(function (view) {
        view.classList.toggle('active', view.id === 'view-' + id);
      });
    }
    Array.prototype.slice.call(document.querySelectorAll('[data-view-nav]')).forEach(function (nav) {
      nav.classList.toggle('active', nav.getAttribute('data-view-nav') === id);
    });
    if (id === 'activityCalendar' && typeof window.renderActivityCalendar === 'function') {
      setTimeout(window.renderActivityCalendar, 30);
    }
    if (id === 'workbench') scheduleWorkbenchRestore();
  }

  function htmlText(value) {
    return String(value == null ? '' : value).replace(/[&<>"']/g, function (ch) {
      return ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' })[ch];
    });
  }

  function currentNewsItems() {
    var data = (window.ADSTAT_DATA && window.ADSTAT_DATA.sideData && window.ADSTAT_DATA.sideData.newsFlash) || {};
    var cats = Array.isArray(data.categories) ? data.categories : [];
    return cats.reduce(function (all, cat) {
      return all.concat(Array.isArray(cat.items) ? cat.items : []);
    }, []).slice(0, 3);
  }

  function restoreWorkbenchExtras() {
    var grid = document.querySelector('#view-workbench .placeholder-grid');
    if (!grid || grid.dataset.blueRestored === '1') return;
    var news = currentNewsItems();
    var newsHtml = news.length
      ? news.map(function (item) { return '<div class="todo-preview-item"><span class="todo-preview-dot"></span><span>' + htmlText(item.title || item.summary || item.content || '资讯') + '</span></div>'; }).join('')
      : '<div class="settings-note">资讯快报尚未刷新，进入“资讯快报”可手动刷新。</div>';
    var today = new Date();
    var y = today.getFullYear();
    var m = today.getMonth();
    var days = new Date(y, m + 1, 0).getDate();
    var cells = '';
    for (var d = 1; d <= days; d++) {
      var cls = d === today.getDate() ? ' style="font-weight:800;color:#1677ff"' : '';
      cells += '<span' + cls + '>' + d + '</span>';
    }
    grid.dataset.blueRestored = '1';
    grid.innerHTML =
      '<button class="placeholder-card todo-entry" id="openTodo" type="button"><span class="module-icon ico-project"></span><h3>&#x5f85;&#x529e;&#x6e05;&#x5355;</h3><p>&#x65b0;&#x589e;&#x3001;&#x7f16;&#x8f91;&#x3001;&#x7c98;&#x8d34;&#x5bfc;&#x5165;&#x548c;&#x5b8c;&#x6210;&#x52fe;&#x9009;&#xff0c;&#x5185;&#x5bb9;&#x4fdd;&#x5b58;&#x5728;&#x5f53;&#x524d;&#x6d4f;&#x89c8;&#x5668;&#x3002;</p><div class="todo-preview" id="todoPreview"></div></button>' +
      '<div class="placeholder-card"><span class="module-icon ico-news"></span><h3>&#x8d44;&#x8baf;&#x5feb;&#x62a5;</h3><p>&#x5c55;&#x793a;&#x6700;&#x65b0;&#x6293;&#x53d6;&#x7684;&#x8fd0;&#x8425;&#x8d44;&#x8baf;&#x6458;&#x8981;&#xff0c;&#x70b9;&#x51fb;&#x5de6;&#x4fa7;&#x5165;&#x53e3;&#x53ef;&#x67e5;&#x770b;&#x5b8c;&#x6574;&#x5206;&#x7c7b;&#x3002;</p><div class="todo-preview">' + newsHtml + '</div></div>' +
      '<div class="placeholder-card"><span class="module-icon ico-report"></span><h3>&#x6d3b;&#x52a8;&#x65e5;&#x5386;</h3><p>' + y + '&#x5e74;' + String(m + 1).padStart(2, '0') + '&#x6708;&#x6392;&#x671f;&#x9884;&#x89c8;&#xff0c;&#x5f53;&#x5929;&#x5df2;&#x9ad8;&#x4eae;&#x3002;</p><div class="mini-calendar" style="display:grid;grid-template-columns:repeat(7,1fr);gap:5px;font-size:12px;color:#31557d">' + cells + '</div></div>' +
      '<div class="placeholder-card"><span class="module-icon ico-data"></span><h3>&#x62a5;&#x544a;&#x5165;&#x53e3;</h3><p>&#x65e5;&#x62a5;&#x3001;&#x5468;&#x62a5;&#x3001;&#x6708;&#x62a5;&#x5185;&#x5bb9;&#x4ecd;&#x5728;&#x5de6;&#x4fa7;&#x201c;&#x6570;&#x636e;&#x7edf;&#x8ba1;&#x201d;&#x4e0b;&#xff0c;&#x53ef;&#x76f4;&#x63a5;&#x6253;&#x5f00;&#x3002;</p></div>';
    if (typeof window.hydrateIcons === 'function') {
      try { window.hydrateIcons(); } catch (e) {}
    }
    if (typeof window.renderTodoPreview === 'function') {
      try { window.renderTodoPreview(); } catch (e) {}
    }
  }

  function scheduleWorkbenchRestore() {
    setTimeout(restoreWorkbenchExtras, 60);
    setTimeout(restoreWorkbenchExtras, 300);
  }
  function boot() {
    keepBlueThemeLast();
    applyNav();
    var hash = (window.location.hash || '').replace('#', '');
    var saved = '';
    try { saved = localStorage.getItem('dxw-active-view') || ''; } catch (e) {}
    openBlueView(hash || saved || 'workbench');
    scheduleWorkbenchRestore();
  }

  window.openBlueView = openBlueView;
  window.addEventListener('hashchange', function () {
    var hash = (window.location.hash || '').replace('#', '');
    if (hash) openBlueView(hash);
  });

  if (document.readyState === 'loading') document.addEventListener('DOMContentLoaded', boot);
  else boot();
})();

(function () {
  var helperBase = 'http://127.0.0.1:5088';
  function fetchJson(path, timeoutMs) {
    var controller = new AbortController();
    var timer = setTimeout(function () { controller.abort(); }, timeoutMs || 6000);
    return fetch(helperBase + path, { cache: 'no-store', signal: controller.signal }).then(function (resp) {
      return resp.text().then(function (text) {
        var json = text ? JSON.parse(text) : {};
        if (!resp.ok) throw new Error(json.error || json.message || ('HTTP ' + resp.status));
        return json;
      });
    }).finally(function () { clearTimeout(timer); });
  }
  function friendly(error) {
    var raw = error && error.message ? error.message : String(error || 'unknown error');
    if (error && error.name === 'AbortError') return '\u672c\u5730\u52a9\u624b\u54cd\u5e94\u8d85\u65f6\uff0c\u8bf7\u68c0\u67e5\u52a9\u624b\u7a97\u53e3\u548c\u53ef\u63a7 Edge\u3002';
    if (/Failed to fetch|NetworkError|Load failed|fetch/i.test(raw)) return '\u672c\u5730\u52a9\u624b\u672a\u8fde\u63a5\u6216 5088 \u7aef\u53e3\u4e0d\u53ef\u7528\u3002';
    return raw;
  }
  function store(key, message, progress, type) {
    try { localStorage.setItem(key, JSON.stringify({ message: message, progress: progress, type: type || '', savedAt: Date.now() })); } catch (e) {}
  }
  function readStore(key) {
    try {
      var item = JSON.parse(localStorage.getItem(key) || '{}');
      if (!item.message || Date.now() - Number(item.savedAt || 0) > 600000) return null;
      return item;
    } catch (e) { return null; }
  }
  function ensureProgress(anchor, key) {
    if (!anchor || !anchor.parentNode) return null;
    var id = key + '-bar';
    var bar = document.getElementById(id);
    if (!bar) {
      bar = document.createElement('div');
      bar.id = id;
      bar.className = 'blue-data-progress dxw-refresh-progress';
      bar.innerHTML = '<div class="blue-data-progress-text">\u7b49\u5f85\u5237\u65b0</div><div class="blue-data-progress-track"><span></span></div>';
      anchor.parentNode.insertAdjacentElement('afterend', bar);
    }
    var saved = readStore(key);
    if (saved) setProgress(bar, saved.message, saved.progress, saved.type);
    return bar;
  }
  function setProgress(bar, message, progress, type) {
    if (!bar) return;
    bar.classList.toggle('ok', type === 'ok');
    bar.classList.toggle('fail', type === 'fail');
    var text = bar.querySelector('.blue-data-progress-text');
    var fill = bar.querySelector('.blue-data-progress-track span');
    if (text) text.textContent = message || '';
    if (fill) fill.style.width = Math.max(0, Math.min(100, Number(progress || 0))) + '%';
  }
  function pollStatus(bar, key, successPrefix, button, oldText) {
    var stopped = false;
    var tick = function () {
      if (stopped) return;
      fetchJson('/update-status', 6000).then(function (s) {
        var progress = Number(s.progress || 20);
        var message = s.message || '\u672c\u5730\u52a9\u624b\u6b63\u5728\u5904\u7406...';
        var type = s.state === 'failed' ? 'fail' : (s.state === 'done' ? 'ok' : '');
        setProgress(bar, message, progress, type);
        store(key, message, progress, type);
        if (s.state === 'done') {
          stopped = true;
          var ok = successPrefix + '\uff1a' + message;
          setProgress(bar, ok, 100, 'ok');
          store(key, ok, 100, 'ok');
          if (button) { button.disabled = false; button.textContent = oldText; }
          return;
        }
        if (s.state === 'failed') {
          stopped = true;
          var fail = successPrefix + '\u5931\u8d25\uff1a' + message;
          setProgress(bar, fail, 100, 'fail');
          store(key, fail, 100, 'fail');
          if (button) { button.disabled = false; button.textContent = oldText; }
          return;
        }
        setTimeout(tick, 900);
      }).catch(function (error) {
        stopped = true;
        var fail = successPrefix + '\u5931\u8d25\uff1a' + friendly(error);
        setProgress(bar, fail, 100, 'fail');
        store(key, fail, 100, 'fail');
        if (button) { button.disabled = false; button.textContent = oldText; }
      });
    };
    tick();
    return function () { stopped = true; };
  }
  function wrapRefreshButton(buttonId, key, successPrefix) {
    var btn = document.getElementById(buttonId);
    if (!btn || btn.dataset.dxwProgressWrapped === '1') return;
    btn.dataset.dxwProgressWrapped = '1';
    var original = btn.onclick;
    var bar = ensureProgress(btn, key);
    btn.onclick = function (event) {
      if (event && event.preventDefault) event.preventDefault();
      var oldText = btn.textContent || '\u5237\u65b0\u6570\u636e';
      btn.disabled = true;
      btn.textContent = '\u5237\u65b0\u4e2d...';
      setProgress(bar, '\u6b63\u5728\u8fde\u63a5\u672c\u5730\u52a9\u624b...', 5, '');
      store(key, '\u6b63\u5728\u8fde\u63a5\u672c\u5730\u52a9\u624b...', 5, '');
      var stop = null;
      return fetchJson('/health', 6000).then(function () {
        setProgress(bar, '\u672c\u5730\u52a9\u624b\u5df2\u8fde\u63a5\uff0c\u6b63\u5728\u63d0\u4ea4\u5237\u65b0\u4efb\u52a1...', 12, '');
        store(key, '\u672c\u5730\u52a9\u624b\u5df2\u8fde\u63a5\uff0c\u6b63\u5728\u63d0\u4ea4\u5237\u65b0\u4efb\u52a1...', 12, '');
        stop = pollStatus(bar, key, successPrefix, btn, oldText);
        if (typeof original === 'function') return Promise.resolve(original.call(btn, event));
      }).catch(function (error) {
        if (stop) stop();
        var fail = successPrefix + '\u5931\u8d25\uff1a' + friendly(error);
        setProgress(bar, fail, 100, 'fail');
        store(key, fail, 100, 'fail');
        btn.disabled = false;
        btn.textContent = oldText;
      });
    };
  }
  function applyRefreshProgressPatch() {
    wrapRefreshButton('updateLatest', 'dxw-data-refresh-progress', '\u6570\u636e\u5df2\u5237\u65b0');
    wrapRefreshButton('refreshDailyReportData', 'dxw-daily-refresh-progress', '\u65e5\u62a5\u8868\u6570\u636e\u5df2\u5237\u65b0');
  }
  window.addEventListener('hashchange', function () { setTimeout(applyRefreshProgressPatch, 80); });
  document.addEventListener('DOMContentLoaded', function () { setTimeout(applyRefreshProgressPatch, 120); });
  setTimeout(applyRefreshProgressPatch, 300);
})();

(function () {
  function dataRows() {
    try { return (window.ADSTAT_DATA && Array.isArray(window.ADSTAT_DATA.rows)) ? window.ADSTAT_DATA.rows : []; } catch (e) { return []; }
  }
  function projectNameFromRow(row) {
    if (row.projectName) return row.projectName;
    var text = String(row.title || '') + ' ' + String(row.target || '') + ' ' + String(row.audienceKey || '') + ' ' + String(row.jump || '');
    return /\u7eed\u8d39|\u8fc7\u671f|\u5df2\u8fc7\u671f/.test(text) ? '\u77ed\u7ebf\u738b\u7eed\u8d39' : '\u77ed\u7ebf\u738b\u65b0\u5f00';
  }
  function collectProjects() {
    var map = {};
    var original = document.getElementById('project');
    if (original) {
      Array.prototype.slice.call(original.options || []).forEach(function (opt) {
        var name = opt.value || opt.textContent;
        if (name) map[name] = opt.dataset ? (opt.dataset.groupId || '') : '';
      });
    }
    dataRows().forEach(function (row) {
      var name = projectNameFromRow(row);
      if (name && !Object.prototype.hasOwnProperty.call(map, name)) map[name] = row.groupId || '';
    });
    if (!Object.keys(map).length) {
      map['\u77ed\u7ebf\u738b\u7eed\u8d39'] = '27';
      map['\u77ed\u7ebf\u738b\u65b0\u5f00'] = '7';
    }
    return map;
  }
  function currentFilterPayload() {
    var project = document.getElementById('dxwDataProject');
    var start = document.getElementById('dxwDataStart');
    var end = document.getElementById('dxwDataEnd');
    var channel = document.getElementById('dxwDataChannel');
    var opt = project && project.selectedOptions ? project.selectedOptions[0] : null;
    return {
      projectName: project ? project.value : '',
      groupId: opt ? (opt.dataset.groupId || '') : '',
      startDate: start ? start.value : '',
      endDate: end ? end.value : '',
      channel: channel ? channel.value : 'ALL'
    };
  }
  function saveFilter(payload) {
    try {
      localStorage.setItem('dxw-blue-data-last-query', JSON.stringify(Object.assign({}, payload, { savedAt: Date.now() })));
      localStorage.setItem('dxw-active-view', 'data');
    } catch (e) {}
  }
  function loadFilter() {
    try { return JSON.parse(localStorage.getItem('dxw-blue-data-last-query') || '{}'); } catch (e) { return {}; }
  }
  function syncOriginalFilters(payload) {
    var p = document.getElementById('project');
    var s = document.getElementById('startDate');
    var e = document.getElementById('endDate');
    var c = document.getElementById('channel');
    if (p && payload.projectName) p.value = payload.projectName;
    if (s) s.value = payload.startDate || '';
    if (e) e.value = payload.endDate || '';
    if (c) c.value = payload.channel || 'ALL';
    try {
      if (window.state) {
        window.state.projectName = payload.projectName || window.state.projectName;
        window.state.groupId = payload.groupId || window.state.groupId;
        window.state.channel = payload.channel || 'ALL';
        window.state.selectedDate = payload.endDate || payload.startDate || window.state.selectedDate;
      }
    } catch (err) {}
  }
  function localRows(payload) {
    return dataRows().filter(function (row) {
      var okProject = !payload.projectName || projectNameFromRow(row) === payload.projectName;
      var okChannel = !payload.channel || payload.channel === 'ALL' || row.channel === payload.channel;
      var okStart = !payload.startDate || row.date >= payload.startDate;
      var okEnd = !payload.endDate || row.date <= payload.endDate;
      return okProject && okChannel && okStart && okEnd;
    });
  }
  function setStatus(message, type) {
    var status = document.getElementById('status');
    if (status) status.textContent = message;
    var bar = document.getElementById('dxw-data-filter-status');
    if (bar) {
      bar.textContent = message;
      bar.classList.toggle('fail', type === 'fail');
      bar.classList.toggle('ok', type === 'ok');
    }
  }
  function applyLocalQuery() {
    var payload = currentFilterPayload();
    saveFilter(payload);
    syncOriginalFilters(payload);
    if (typeof window.render === 'function') window.render();
    var rows = localRows(payload);
    setStatus(rows.length ? ('\u67e5\u8be2\u5b8c\u6210\uff1a\u5df2\u5339\u914d ' + rows.length + ' \u6761\u660e\u7ec6\u3002') : '\u67e5\u8be2\u5b8c\u6210\uff1a\u672c\u5730\u6682\u65e0\u5339\u914d\u6570\u636e\uff0c\u9700\u8981\u540e\u53f0\u6293\u53d6\u65f6\u8bf7\u70b9\u201c\u5237\u65b0\u6570\u636e\u201d\u3002', rows.length ? 'ok' : 'fail');
  }
  function ensureDataFilterBar() {
    if ((location.hash || '').replace('#', '') !== 'data') return;
    var view = document.getElementById('view-data');
    if (!view) return;
    var first = view.querySelector('.section') || view.firstElementChild;
    if (!first) return;
    var bar = document.getElementById('dxw-data-filter-restore');
    if (!bar) {
      bar = document.createElement('div');
      bar.id = 'dxw-data-filter-restore';
      bar.className = 'blue-data-filter-bar dxw-data-filter-restore';
      bar.innerHTML = '<label>\u9879\u76ee\u7b5b\u9009<select id="dxwDataProject"></select></label><label>\u5f00\u59cb\u65e5\u671f<input id="dxwDataStart" type="date"></label><label>\u7ed3\u675f\u65e5\u671f<input id="dxwDataEnd" type="date"></label><label>\u6e20\u9053<select id="dxwDataChannel"><option value="ALL">\u5168\u90e8\u6e20\u9053</option><option value="APP">APP</option><option value="PC">PC</option></select></label><button type="button" id="dxwDataApply">\u67e5\u8be2</button><button type="button" id="dxwDataRefresh">\u5237\u65b0\u6570\u636e</button><button type="button" id="dxwDataReset">\u91cd\u7f6e</button>';
      first.insertBefore(bar, first.firstChild);
      var status = document.createElement('div');
      status.id = 'dxw-data-filter-status';
      status.className = 'blue-data-progress dxw-data-filter-status';
      status.textContent = '\u7b49\u5f85\u67e5\u8be2';
      bar.insertAdjacentElement('afterend', status);
    }
    var projectMap = collectProjects();
    var project = document.getElementById('dxwDataProject');
    var saved = loadFilter();
    var currentProject = saved.projectName || (window.state && window.state.projectName) || Object.keys(projectMap)[0];
    project.innerHTML = Object.keys(projectMap).map(function (name) { return '<option value="' + name + '" data-group-id="' + (projectMap[name] || '') + '">' + name + '</option>'; }).join('');
    if (projectMap[currentProject]) project.value = currentProject;
    document.getElementById('dxwDataStart').value = saved.startDate || (document.getElementById('startDate') ? document.getElementById('startDate').value : '');
    document.getElementById('dxwDataEnd').value = saved.endDate || (document.getElementById('endDate') ? document.getElementById('endDate').value : '');
    document.getElementById('dxwDataChannel').value = saved.channel || (document.getElementById('channel') ? document.getElementById('channel').value : 'ALL') || 'ALL';
    document.getElementById('dxwDataApply').onclick = applyLocalQuery;
    document.getElementById('dxwDataRefresh').onclick = function () {
      var payload = currentFilterPayload();
      saveFilter(payload);
      syncOriginalFilters(payload);
      var real = document.getElementById('updateLatest');
      if (real) real.click();
      else setStatus('\u5237\u65b0\u5931\u8d25\uff1a\u672a\u627e\u5230\u539f\u59cb\u5237\u65b0\u6309\u94ae\u3002', 'fail');
    };
    document.getElementById('dxwDataReset').onclick = function () {
      try { localStorage.removeItem('dxw-blue-data-last-query'); } catch (e) {}
      document.getElementById('dxwDataStart').value = '';
      document.getElementById('dxwDataEnd').value = '';
      document.getElementById('dxwDataChannel').value = 'ALL';
      applyLocalQuery();
    };
  }
  window.addEventListener('hashchange', function () { setTimeout(ensureDataFilterBar, 100); });
  document.addEventListener('DOMContentLoaded', function () { setTimeout(ensureDataFilterBar, 200); });
  setInterval(ensureDataFilterBar, 1500);
  setTimeout(ensureDataFilterBar, 300);
})();
