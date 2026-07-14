(function () {
  var BLUE_VERSION = 'menu-shell-20260713-01';

  function keepBlueThemeLast() {
    var orange = document.getElementById('orange-sidebar-lock-link');
    if (orange && orange.parentNode) orange.parentNode.removeChild(orange);
    Array.prototype.slice.call(document.querySelectorAll('link[href*="orange-sidebar-lock.css"]')).forEach(function (link) {
      if (link.parentNode) link.parentNode.removeChild(link);
    });
    document.documentElement.dataset.theme = 'blueGlass';
    if (document.body) {
      document.body.classList.remove('orange-locked');
      document.body.dataset.theme = 'blueGlass';
      document.body.classList.add('blue-glass-ui');
    }
    var href = 'blue-glass-ui-override.css';
    var blue = Array.prototype.slice.call(document.querySelectorAll('link[rel="stylesheet"]')).find(function (link) {
      return (link.getAttribute('href') || '').indexOf(href) !== -1;
    });
    if (!blue) {
      blue = document.createElement('link');
      blue.rel = 'stylesheet';
      blue.href = href + '?v=' + BLUE_VERSION;
    }
    if (blue.parentNode !== document.head || blue !== document.head.lastElementChild) {
      if (blue.parentNode) blue.parentNode.removeChild(blue);
      document.head.appendChild(blue);
    }
  }

  function item(view, icon, label, extra) {
    var isParent = (extra || '').indexOf('nav-parent') !== -1;
    return '<div class="nav-item ' + (extra || '') + '" data-view-nav="' + view + '"><span class="nav-ico ' + icon + '"></span><span>' + label + '</span>' + (isParent ? '<button class="nav-toggle" type="button" aria-label="expand" aria-expanded="false"></button>' : '') + '</div>';
  }

  function sub(view, label) {
    return '<div class="nav-subitem" data-view-nav="' + view + '"><span class="sub-ico ico-data"></span><span>' + label + '</span></div>';
  }


  function timeGreeting() {
    var h = new Date().getHours();
    if (h < 11) return '&#x65e9;&#x4e0a;&#x597d;';
    if (h < 14) return '&#x4e2d;&#x5348;&#x597d;';
    if (h < 18) return '&#x4e0b;&#x5348;&#x597d;';
    return '&#x665a;&#x4e0a;&#x597d;';
  }

  function forceBlueBrand() {
    var brand = document.querySelector('.side-brand');
    if (!brand) return;
    brand.innerHTML = '<span class="blue-brand-mark" aria-hidden="true"><span class="blue-brand-fish">&#x1f41f;</span><span class="blue-brand-bubbles"></span></span><span class="blue-brand-copy"><strong>Jobingho &#x7684;&#x5de5;&#x4f5c;&#x7a7a;&#x95f4;</strong><small>' + timeGreeting() + '&#xff01;&#x65b0;&#x7684;&#x4e00;&#x5929;&#x52aa;&#x529b;&#x5de5;&#x4f5c;</small></span>';
  }

  function updateBrandGreeting() {
    var small = document.querySelector('.blue-brand-copy small');
    if (small) small.innerHTML = timeGreeting() + '&#xff01;&#x65b0;&#x7684;&#x4e00;&#x5929;&#x52aa;&#x529b;&#x5de5;&#x4f5c;';
  }

  function bindWorkbenchCardActions() {
    var newsMore = document.querySelector('.blue-home-news .blue-home-more');
    if (newsMore && newsMore.dataset.boundNews !== '1') {
      newsMore.dataset.boundNews = '1';
      newsMore.addEventListener('click', function (event) {
        event.preventDefault();
        event.stopPropagation();
        openBlueView('newsFlash');
      });
    }
    var todoCard = document.getElementById('openTodo');
    if (todoCard && todoCard.dataset.boundTodo !== '1') {
      todoCard.dataset.boundTodo = '1';
      todoCard.addEventListener('click', function (event) {
        event.preventDefault();
        if (typeof window.openTodoPanel === 'function') window.openTodoPanel();
      });
    }
    var calCard = document.querySelector('.blue-home-calendar[data-view-nav="activityCalendar"]');
    if (calCard && calCard.dataset.boundCalendar !== '1') {
      calCard.dataset.boundCalendar = '1';
      calCard.addEventListener('click', function () { openBlueView('activityCalendar'); });
    }
  }


  function ensureNavShell() {
    var rail = document.querySelector('.side-rail');
    var brand = document.querySelector('.side-brand');
    if (!rail || rail.querySelector('.blue-nav-shell')) return;
    var shell = document.createElement('div');
    shell.className = 'blue-nav-shell';
    var move = [];
    Array.prototype.slice.call(rail.children).forEach(function (child) {
      if (child !== brand) move.push(child);
    });
    move.forEach(function (child) { shell.appendChild(child); });
    rail.appendChild(shell);
  }  function applyNav() {
    var rail = document.querySelector('.side-rail');
    var brand = document.querySelector('.side-brand');
    if (!rail) return;
    if (rail.dataset.blueFullNav === '1') { forceBlueBrand(); ensureNavShell(); return; }
    rail.dataset.blueFullNav = '1';
    if (brand) {
      brand.innerHTML = '<span class="blue-brand-mark" aria-hidden="true"><span class="blue-brand-fish">&#x1f41f;</span><span class="blue-brand-bubbles"></span></span><span class="blue-brand-copy"><strong>Jobingho &#x7684;&#x5de5;&#x4f5c;&#x7a7a;&#x95f4;</strong><small>' + timeGreeting() + '&#xff01;&#x65b0;&#x7684;&#x4e00;&#x5929;&#x52aa;&#x529b;&#x5de5;&#x4f5c;</small></span>';
    }
    Array.prototype.slice.call(rail.children).forEach(function (child) {
      if (child !== brand) child.remove();
    });
    rail.insertAdjacentHTML('beforeend',
      item('workbench', 'ico-workbench', '&#x9996;&#x9875;', 'active') +
      item('project', 'ico-project', '&#x9879;&#x76ee;&#x7ba1;&#x7406;', 'nav-parent expanded') +
      '<div class="nav-subgroup open">' + sub('activityCalendar', '&#x6d3b;&#x52a8;&#x65e5;&#x5386;') + sub('document', '&#x590d;&#x76d8;&#x6587;&#x6863;') + sub('material', '&#x7d20;&#x6750;&#x5e93;') + '</div>' +
      item('data', 'ico-data', '&#x6570;&#x636e;&#x7edf;&#x8ba1;', 'nav-parent expanded') +
      '<div class="nav-subgroup open">' + sub('data', '&#x6570;&#x636e;&#x603b;&#x8868;') + sub('dailyReport', '&#x65e5;&#x62a5;&#x8868;') + sub('weeklyReport', '&#x5468;&#x62a5;&#x8868;') + '</div>' +
      item('strategy', 'ico-auto', '&#x6295;&#x653e;&#x7b56;&#x7565;', 'nav-parent expanded') +
      '<div class="nav-subgroup open">' + sub('automation', '&#x5e7f;&#x544a;&#x81ea;&#x52a8;&#x5316;') + sub('experience', '&#x6295;&#x653e;&#x7ecf;&#x9a8c;') + '</div>' +
      item('newsFlash', 'ico-news', '&#x5185;&#x5bb9;&#x8fd0;&#x8425;', 'nav-parent expanded') +
      '<div class="nav-subgroup open">' + sub('newsFlash', '&#x8d44;&#x8baf;&#x5feb;&#x62a5;') + sub('copywriting', '&#x6587;&#x6848;&#x751f;&#x6210;') + '</div>' +
      item('officialAccount', 'ico-auto', '&#x516c;&#x4f17;&#x53f7;', 'nav-parent') +
      '<div class="nav-subgroup">' + sub('officialAccount', '&#x81ea;&#x52a8;&#x5316;&#x4f20;&#x6587;&#x7ae0;') + '</div>' +
      item('risk', 'ico-risk', '&#x98ce;&#x63a7;&#x5ba1;&#x6279;') +
      item('settings', 'ico-settings', '&#x7cfb;&#x7edf;&#x8bbe;&#x7f6e;')
    );
    ensureNavShell();
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
      link.href = 'assets/activity-calendar.css?v=' + BLUE_VERSION;
      document.head.appendChild(link);
    }
    if (!document.querySelector('script[src*="assets/activity-calendar.js"]')) {
      var script = document.createElement('script');
      script.src = 'assets/activity-calendar.js?v=' + BLUE_VERSION;
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

  function normalizeView(id) {
    return id === 'calendar' ? 'activityCalendar' : id;
  }

  function openBlueView(id) {
    id = normalizeView(id || 'workbench');
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
    ensureNavShell();
    Array.prototype.slice.call(document.querySelectorAll('[data-view-nav]')).forEach(function (nav) {
      nav.classList.toggle('active', normalizeView(nav.getAttribute('data-view-nav')) === id);
    });
    try { localStorage.setItem('dxw-active-view', id); } catch (e) {}
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
    if (!grid) return;
    if (grid.dataset.blueRestored === '1') { bindWorkbenchCardActions(); return; }
    var news = currentNewsItems();
    var newsHtml = news.length
      ? news.map(function (newsItem) { return '<div class="todo-preview-item"><span class="todo-preview-dot"></span><span>' + htmlText(newsItem.title || newsItem.summary || newsItem.content || '&#x8d44;&#x8baf;&#x5feb;&#x62a5;') + '</span></div>'; }).join('')
      : '<div class="settings-note">&#x6682;&#x65e0;&#x65b0;&#x8d44;&#x8baf;&#xff0c;&#x8bf7;&#x5230;&#x8d44;&#x8baf;&#x5feb;&#x62a5;&#x9875;&#x5237;&#x65b0;&#x3002;</div>';
    var today = new Date();
    var y = today.getFullYear();
    var m = today.getMonth();
    var days = new Date(y, m + 1, 0).getDate();
    var weekLabels = ['周一','周二','周三','周四','周五','周六','周日'];
    var firstDay = new Date(y, m, 1);
    var leading = (firstDay.getDay() + 6) % 7;
    var cells = weekLabels.map(function (label) { return '<b>' + label + '</b>'; }).join('');
    for (var i = 0; i < leading; i++) cells += '<span class="muted"></span>';
    for (var d = 1; d <= days; d++) {
      var dayOfWeek = new Date(y, m, d).getDay();
      var isToday = d === today.getDate();
      var isRest = dayOfWeek === 0 || dayOfWeek === 6;
      var cls = (isToday ? ' today' : '') + (isRest ? ' rest' : '');
      cells += '<span class="' + cls + '">' + d + (isRest ? '<small>&#x4f11;</small>' : '') + '</span>';
    }
    grid.dataset.blueRestored = '1';
    grid.innerHTML =
      '<button class="placeholder-card todo-entry blue-home-todo" id="openTodo" type="button"><span class="module-icon ico-project"></span><h3>&#x5f85;&#x529e;&#x4e8b;&#x9879;<a class="blue-home-more" href="javascript:void(0)">&#x66f4;&#x591a;</a></h3><p>&#x65b0;&#x589e;&#x3001;&#x7f16;&#x8f91;&#x3001;&#x7c98;&#x8d34;&#x5bfc;&#x5165;&#x548c;&#x5b8c;&#x6210;&#x52fe;&#x9009;&#xff0c;&#x5185;&#x5bb9;&#x4fdd;&#x5b58;&#x5728;&#x5f53;&#x524d;&#x6d4f;&#x89c8;&#x5668;&#x3002;</p><div class="todo-preview" id="todoPreview"></div></button>' +
      '<div class="placeholder-card blue-home-news"><span class="module-icon ico-news"></span><h3>&#x8d44;&#x8baf;&#x5feb;&#x62a5;<a class="blue-home-more" href="javascript:void(0)">&#x66f4;&#x591a;</a></h3><p>&#x5c55;&#x793a;&#x6700;&#x65b0;&#x6293;&#x53d6;&#x7684;&#x8fd0;&#x8425;&#x8d44;&#x8baf;&#x6458;&#x8981;&#xff0c;&#x70b9;&#x51fb;&#x5de6;&#x4fa7;&#x5165;&#x53e3;&#x53ef;&#x67e5;&#x770b;&#x5b8c;&#x6574;&#x5206;&#x7c7b;&#x3002;</p><div class="todo-preview">' + newsHtml + '</div></div>' +
      '<button class="placeholder-card blue-home-calendar" type="button" data-view-nav="activityCalendar"><span class="module-icon ico-report"></span><h3>&#x6d3b;&#x52a8;&#x65e5;&#x5386;</h3><p>' + y + '&#x5e74;' + String(m + 1).padStart(2, '0') + '&#x6708;&#x6392;&#x671f;&#x9884;&#x89c8;&#xff0c;&#x5f53;&#x5929;&#x5df2;&#x9ad8;&#x4eae;&#x3002;</p><div class="mini-calendar" style="display:grid;grid-template-columns:repeat(7,1fr);gap:5px;font-size:12px;color:#31557d">' + cells + '</div></button>' +
      '<div class="placeholder-card blue-home-report"><span class="module-icon ico-data"></span><h3>&#x62a5;&#x544a;&#x5165;&#x53e3;</h3><p>&#x65e5;&#x62a5;&#x3001;&#x5468;&#x62a5;&#x5185;&#x5bb9;&#x5728;&#x5de6;&#x4fa7;&#x201c;&#x6570;&#x636e;&#x7edf;&#x8ba1;&#x201d;&#x4e0b;&#xff0c;&#x53ef;&#x76f4;&#x63a5;&#x6253;&#x5f00;&#x3002;</p></div>';
    var calCard = grid.querySelector('[data-view-nav="activityCalendar"]');
    if (calCard) calCard.addEventListener('click', function () { openBlueView('activityCalendar'); });
    var newsMore = grid.querySelector('.blue-home-news .blue-home-more');
    if (newsMore) newsMore.addEventListener('click', function (event) { event.preventDefault(); event.stopPropagation(); openBlueView('newsFlash'); });
    var todoCard = document.getElementById('openTodo');
    if (todoCard) {
      todoCard.addEventListener('click', function (event) {
        event.preventDefault();
        if (typeof window.openTodoPanel === 'function') window.openTodoPanel();
      });
    }
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
    var hash = normalizeView((window.location.hash || '').replace('#', ''));
    var saved = '';
    try { saved = normalizeView(localStorage.getItem('dxw-active-view') || ''); } catch (e) {}
    openBlueView(hash || saved || 'workbench');
    scheduleWorkbenchRestore();
    if (document.body) document.body.classList.add('blue-ui-ready');
  }

  window.openBlueView = openBlueView;
  window.addEventListener('hashchange', function () {
    var hash = normalizeView((window.location.hash || '').replace('#', ''));
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
      bar.className = 'blue-data-progress dxw-refresh-progress' + (key === 'dxw-daily-refresh-progress' ? ' dxw-daily-refresh-progress' : '');
      bar.innerHTML = '<div class="blue-data-progress-text">\u7b49\u5f85\u5237\u65b0</div><div class="blue-data-progress-track"><span></span></div>';
      var dailyNote = key === 'dxw-daily-refresh-progress' ? document.getElementById('dailyReportDateNote') : null;
      if (dailyNote && dailyNote.parentNode) {
        dailyNote.insertAdjacentElement('afterend', bar);
      } else {
        anchor.parentNode.insertAdjacentElement('afterend', bar);
      }
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
          var cleanMessage = String(message || '').replace('请刷新页面查看', '当前页面已展示最新数据');
          var ok = successPrefix + '\\uff1a' + cleanMessage;
          setProgress(bar, ok, 100, 'ok');
          store(key, ok, 100, 'ok');
          if (button) { button.disabled = false; button.textContent = oldText; }
          setTimeout(reloadWithCacheBust, 1200);
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
  function reloadWithCacheBust() {
    try {
      var url = new URL(location.href);
      url.searchParams.set('refresh', String(Date.now()));
      location.href = url.toString();
    } catch (e) {
      location.reload();
    }
  }
  function canonicalProjectName(name, groupId) {
    var gid = String(groupId || "");
    if (gid === "7") return "\u77ed\u7ebf\u738b\u65b0\u5f00";
    if (gid === "27") return "\u77ed\u7ebf\u738b\u7eed\u8d39";
    var text = String(name || "");
    if (/\u7eed\u8d39|\u8fc7\u671f|\u5df2\u8fc7\u671f/.test(text)) return "\u77ed\u7ebf\u738b\u7eed\u8d39";
    if (/\u65b0\u5f00|\u9434/.test(text)) return "\u77ed\u7ebf\u738b\u65b0\u5f00";
    return text;
  }

  function groupIdFromProjectSelect(project, option) {
    var fromOption = option && option.dataset ? String(option.dataset.groupId || option.dataset.groupID || "") : "";
    if (fromOption) return fromOption;
    var value = String(project && project.value || "");
    var text = String(option && (option.textContent || option.value) || value);
    var combined = value + " " + text;
    if (/27|续费|过期|已过期|\u7eed\u8d39|\u8fc7\u671f|\u5df2\u8fc7\u671f/.test(combined)) return "27";
    if (/^7$|新开|\u65b0\u5f00/.test(combined)) return "7";
    try {
      var projects = window.PROJECTS || (window.ADSTAT_DATA && window.ADSTAT_DATA.projects) || [];
      var hit = projects.find(function (p) { return p && (String(p.name || "") === value || String(p.name || "") === text); });
      if (hit && hit.groupId) return String(hit.groupId);
    } catch (ignore) {}
    return "";
  }

  function refreshPayload(buttonId) {
    if (buttonId === 'refreshDailyReportData') {
      var project = document.getElementById('reportProject');
      var current = document.getElementById('reportCurrentDate');
      var compare = document.getElementById('reportCompareDate');
      var channel = document.getElementById('reportChannel');
      var option = project && project.selectedOptions ? project.selectedOptions[0] : null;
      var groupId = groupIdFromProjectSelect(project, option);
      var currentDate = current ? current.value : '';
      var compareDate = compare ? compare.value : '';
      var dates = [currentDate, compareDate].filter(Boolean).sort();
      var payload = {
        startDate: dates[0] || currentDate,
        endDate: dates[dates.length - 1] || currentDate,
        currentDate: currentDate,
        dateList: dates,
        channel: channel ? channel.value : 'ALL',
        projectName: canonicalProjectName(option ? (option.textContent || option.value) : (project ? project.value : ''), groupId),
        groupId: groupId
      };
      try {
        localStorage.setItem('dxw-daily-last-query', JSON.stringify({
          projectName: payload.projectName,
          projectValue: project ? project.value : '',
          groupId: payload.groupId,
          currentDate: currentDate,
          compareDate: compareDate,
          channel: payload.channel
        }));
      } catch (ignore) {}
      return payload;
    }
    var project = document.getElementById('blueDataProject') || document.getElementById('project');
    var option = project && project.selectedOptions ? project.selectedOptions[0] : null;
    var groupId = groupIdFromProjectSelect(project, option);
    var start = document.getElementById('blueDataStart') || document.getElementById('startDate');
    var end = document.getElementById('blueDataEnd') || document.getElementById('endDate');
    var channel = document.getElementById('blueDataChannel') || document.getElementById('channel');
    return {
      startDate: start ? start.value : '',
      endDate: end ? end.value : '',
      currentDate: end ? end.value : '',
      channel: channel ? channel.value : 'ALL',
      projectName: canonicalProjectName(option ? (option.textContent || option.value) : (project ? project.value : ''), groupId),
      groupId: groupId
    };
  }
  function wrapRefreshButton(buttonId, key, successPrefix) {
    var btn = document.getElementById(buttonId);
    if (!btn || btn.dataset.dxwProgressWrapped === '1') return;
    btn.dataset.dxwProgressWrapped = '1';
    var bar = ensureProgress(btn, key);
    btn.onclick = function (event) {
      if (event && event.preventDefault) event.preventDefault();
      var oldText = btn.textContent || '鍒锋柊鏁版嵁';
      var payload = refreshPayload(buttonId);
      btn.disabled = true;
      btn.textContent = '鍒锋柊涓?..';
      setProgress(bar, '姝ｅ湪杩炴帴鏈湴鍔╂墜...', 5, '');
      store(key, '姝ｅ湪杩炴帴鏈湴鍔╂墜...', 5, '');
      var stop = null;
      return fetchJson('/health', 6000).then(function () {
        setProgress(bar, '鏈湴鍔╂墜宸茶繛鎺ワ紝姝ｅ湪鎻愪氦鍒锋柊浠诲姟...', 12, '');
        store(key, '鏈湴鍔╂墜宸茶繛鎺ワ紝姝ｅ湪鎻愪氦鍒锋柊浠诲姟...', 12, '');
        return fetch('http://127.0.0.1:5088/update-latest', {
          method: 'POST',
          headers: {'content-type': 'application/json'},
          body: JSON.stringify(payload)
        });
      }).then(function (response) {
        return response.json();
      }).then(function (result) {
        if (!result || !result.ok) throw new Error((result && (result.error || (result.status && result.status.message))) || '鍒锋柊浠诲姟鎻愪氦澶辫触');
        stop = pollStatus(bar, key, successPrefix, btn, oldText);
      }).catch(function (error) {
        if (stop) stop();
        var fail = successPrefix + '\u5931\u8d25\uff1a' + friendly(error);
        setProgress(bar, fail, 100, 'fail');
        store(key, fail, 100, 'fail');
        btn.disabled = false;
        btn.textContent = oldText;
      });
    };
  }  function reconcileRefreshStatus() {
    fetchJson('/update-status', 4000).then(function (status) {
      if (!status || status.state !== 'done') return;
      var message = status.message || '刷新完成';
      [
        { id: 'dxw-data-refresh-progress-bar', key: 'dxw-data-refresh-progress', prefix: '\u6570\u636e\u5df2\u5237\u65b0' },
        { id: 'dxw-daily-refresh-progress-bar', key: 'dxw-daily-refresh-progress', prefix: '\u65e5\u62a5\u8868\u6570\u636e\u5df2\u5237\u65b0' }
      ].forEach(function (item) {
        var bar = document.getElementById(item.id);
        var cleanMessage = String(message || '').replace('请刷新页面查看', '当前页面已展示最新数据');
        var text = item.prefix + '：' + cleanMessage;
        if (bar) setProgress(bar, text, 100, 'ok');
        store(item.key, text, 100, 'ok');
      });
    }).catch(function () {});
  }
  function applyRefreshProgressPatch() {
    wrapRefreshButton('updateLatest', 'dxw-data-refresh-progress', '\u6570\u636e\u5df2\u5237\u65b0');
    wrapRefreshButton('refreshDailyReportData', 'dxw-daily-refresh-progress', '\u65e5\u62a5\u8868\u6570\u636e\u5df2\u5237\u65b0');
    reconcileRefreshStatus();
  }
  window.addEventListener('hashchange', function () { setTimeout(applyRefreshProgressPatch, 80); });
  document.addEventListener('DOMContentLoaded', function () { setTimeout(applyRefreshProgressPatch, 120); });
  setTimeout(applyRefreshProgressPatch, 300);
})();

(function () {
  function dataRows() {
    try { return (window.ADSTAT_DATA && Array.isArray(window.ADSTAT_DATA.rows)) ? window.ADSTAT_DATA.rows : []; } catch (e) { return []; }
  }
  var archiveLoads = {};
  function monthsBetween(startDate, endDate) {
    var months = [];
    if (!startDate || !endDate) return months;
    var start = new Date(startDate.slice(0, 7) + '-01T00:00:00');
    var end = new Date(endDate.slice(0, 7) + '-01T00:00:00');
    if (isNaN(start.getTime()) || isNaN(end.getTime())) return months;
    while (start <= end) {
      months.push(start.getFullYear() + '-' + String(start.getMonth() + 1).padStart(2, '0'));
      start.setMonth(start.getMonth() + 1);
    }
    return months;
  }
  function rowKey(row) {
    return [row.projectName || '', row.date || '', row.channel || '', row.adId || '', row.popupTime || ''].join('|');
  }
  function mergeArchiveRows(rows) {
    if (!window.ADSTAT_DATA) return 0;
    if (!Array.isArray(window.ADSTAT_DATA.rows)) window.ADSTAT_DATA.rows = [];
    var seen = {};
    window.ADSTAT_DATA.rows.forEach(function (row) { seen[rowKey(row)] = true; });
    var added = 0;
    (rows || []).forEach(function (row) {
      var key = rowKey(row);
      if (!seen[key]) { seen[key] = true; window.ADSTAT_DATA.rows.push(row); added += 1; }
    });
    return added;
  }
  function loadArchiveMonth(month) {
    if (!month) return Promise.resolve(0);
    if (archiveLoads[month]) return archiveLoads[month];
    var existing = window.DXW_ARCHIVE_CHUNKS && window.DXW_ARCHIVE_CHUNKS[month];
    if (existing) { archiveLoads[month] = Promise.resolve(mergeArchiveRows(existing.rows || [])); return archiveLoads[month]; }
    archiveLoads[month] = new Promise(function (resolve) {
      var script = document.createElement('script');
      script.src = 'archive/adstat-' + month + '.js?v=' + encodeURIComponent((window.ADSTAT_DATA && window.ADSTAT_DATA.generatedAt) || Date.now());
      script.onload = function () { var chunk = window.DXW_ARCHIVE_CHUNKS && window.DXW_ARCHIVE_CHUNKS[month]; resolve(chunk ? mergeArchiveRows(chunk.rows || []) : 0); };
      script.onerror = function () { resolve(0); };
      document.head.appendChild(script);
    });
    return archiveLoads[month];
  }
  function ensureArchiveRows(payload) {
    var months = monthsBetween(payload.startDate, payload.endDate);
    if (!months.length) return Promise.resolve(0);
    return Promise.all(months.map(loadArchiveMonth)).then(function (counts) { return counts.reduce(function (sum, n) { return sum + Number(n || 0); }, 0); });
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
      if (typeof window.setProject === 'function' && payload.projectName) {
        window.setProject(payload.projectName, payload.groupId || '');
      }
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
  function setDataRefreshProgress(message, progress, type) {
    setStatus(message, type);
    var bar = document.getElementById("dxw-data-refresh-progress-bar");
    if (bar) {
      bar.classList.toggle("ok", type === "ok");
      bar.classList.toggle("fail", type === "fail");
      var text = bar.querySelector(".blue-data-progress-text");
      var fill = bar.querySelector(".blue-data-progress-track span");
      if (text) text.textContent = message || "";
      if (fill) fill.style.width = Math.max(0, Math.min(100, Number(progress || 0))) + "%";
    }
    try { localStorage.setItem("dxw-data-refresh-progress", JSON.stringify({ message: message, progress: progress, type: type || "", savedAt: Date.now() })); } catch (e) {}
  }
  function dataRefreshPayload() {
    var payload = currentFilterPayload();
    var groupId = String(payload.groupId || "");
    if (!groupId) groupId = /续费|过期|已过期/.test(String(payload.projectName || "")) ? "27" : (/新开/.test(String(payload.projectName || "")) ? "7" : "");
    if (groupId === "27") payload.projectName = "短线王续费";
    if (groupId === "7") payload.projectName = "短线王新开";
    payload.groupId = groupId;
    payload.currentDate = payload.endDate || payload.startDate || "";
    delete payload.dateList;
    return payload;
  }
  function pollDataRefreshStatus(button, oldText) {
    var stopped = false;
    var tick = function () {
      if (stopped) return;
      fetch("http://127.0.0.1:5088/update-status", { cache: "no-store" }).then(function (resp) { return resp.json(); }).then(function (s) {
        var progress = Number(s.progress || 20);
        var message = s.message || "本地助手正在刷新数据...";
        var type = s.state === "failed" ? "fail" : (s.state === "done" ? "ok" : "");
        setDataRefreshProgress(message, progress, type);
        if (s.state === "done") {
          stopped = true;
          setDataRefreshProgress("数据已刷新：" + String(message || "").replace("请刷新页面查看", "当前页面即将重新加载"), 100, "ok");
          if (button) { button.disabled = false; button.textContent = oldText; }
          setTimeout(function () {
            try { var url = new URL(location.href); url.searchParams.set("refresh", String(Date.now())); location.href = url.toString(); } catch (e) { location.reload(); }
          }, 1000);
          return;
        }
        if (s.state === "failed") {
          stopped = true;
          setDataRefreshProgress("数据刷新失败：" + message, 100, "fail");
          if (button) { button.disabled = false; button.textContent = oldText; }
          return;
        }
        setTimeout(tick, 900);
      }).catch(function () {
        if (stopped) return;
        setDataRefreshProgress("正在等待本地助手返回进度...", 15, "");
        setTimeout(tick, 1200);
      });
    };
    tick();
  }
  function syncDataRefreshStatus() {
    var active = null;
    try { active = JSON.parse(localStorage.getItem("dxw-data-refresh-progress") || "null"); } catch (e) {}
    if (!active || !active.savedAt || Date.now() - Number(active.savedAt) > 600000) return;
    fetch("http://127.0.0.1:5088/update-status", { cache: "no-store" }).then(function (resp) { return resp.json(); }).then(function (s) {
      if (!s || !s.state || !s.message) return;
      if (["running", "done", "failed"].indexOf(String(s.state)) < 0) return;
      var type = s.state === "failed" ? "fail" : (s.state === "done" ? "ok" : "");
      var message = s.state === "done" ? ("数据已刷新：" + String(s.message || "").replace("请刷新页面查看", "当前页面已展示最新数据")) : (s.state === "failed" ? ("数据刷新失败：" + s.message) : s.message);
      setDataRefreshProgress(message, Number(s.progress || 0), type);
    }).catch(function () {});
  }

  function refreshDataRange() {
    var btn = document.getElementById("dxwDataRefresh");
    var oldText = btn ? btn.textContent : "刷新数据";
    var payload = dataRefreshPayload();
    saveFilter(payload);
    syncOriginalFilters(payload);
    if (!payload.startDate || !payload.endDate) { setDataRefreshProgress("数据刷新失败：请选择开始日期和结束日期。", 100, "fail"); return; }
    if (btn) { btn.disabled = true; btn.textContent = "刷新中..."; }
    setDataRefreshProgress("正在提交刷新任务：" + payload.projectName + " " + payload.startDate + " 至 " + payload.endDate, 8, "");
    fetch("http://127.0.0.1:5088/update-latest", { method: "POST", headers: { "content-type": "application/json" }, body: JSON.stringify(payload) })
      .then(function (resp) { return resp.json(); })
      .then(function (json) {
        if (!json || !json.ok) throw new Error((json && (json.error || (json.status && json.status.message))) || "刷新任务提交失败");
        setDataRefreshProgress("刷新任务已提交，正在等待本地助手处理...", 12, "");
        pollDataRefreshStatus(btn, oldText);
      })
      .catch(function (err) {
        setDataRefreshProgress("数据刷新失败：" + (err && err.message ? err.message : String(err || "未知错误")), 100, "fail");
        if (btn) { btn.disabled = false; btn.textContent = oldText; }
      });
  }

  function applyLocalQuery() {
    var payload = currentFilterPayload();
    saveFilter(payload);
    syncOriginalFilters(payload);
    try { localStorage.removeItem('dxw-data-refresh-progress'); } catch (e) {}
    setStatus('正在读取本地归档数据...', '');
    return ensureArchiveRows(payload).then(function () {
      if (typeof window.render === 'function') window.render();
      var rows = localRows(payload);
      setStatus(rows.length ? ('查询完成：已匹配 ' + rows.length + ' 条明细。') : '查询完成：本地暂无匹配数据，需要后台抓取时请点“刷新数据”。', rows.length ? 'ok' : 'fail');
    });
  }
  function ensureDataFilterBar() {
    if ((location.hash || '').replace('#', '') !== 'data') return;
    var view = document.getElementById('view-data');
    if (!view) return;
    var first = view.querySelector('.section') || view.firstElementChild;
    if (!first) return;
    var bar = document.getElementById('dxw-data-filter-restore');
    var hadBar = !!bar;
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
    var startInput = document.getElementById('dxwDataStart');
    var endInput = document.getElementById('dxwDataEnd');
    var channelInput = document.getElementById('dxwDataChannel');
    var saved = loadFilter();
    var currentProject = hadBar && project && project.value ? project.value : (saved.projectName || (window.state && window.state.projectName) || Object.keys(projectMap)[0]);
    var currentStart = hadBar && startInput ? startInput.value : (saved.startDate || (document.getElementById('startDate') ? document.getElementById('startDate').value : ''));
    var currentEnd = hadBar && endInput ? endInput.value : (saved.endDate || (document.getElementById('endDate') ? document.getElementById('endDate').value : ''));
    var currentChannel = hadBar && channelInput ? channelInput.value : (saved.channel || (document.getElementById('channel') ? document.getElementById('channel').value : 'ALL') || 'ALL');
    project.innerHTML = Object.keys(projectMap).map(function (name) { return '<option value="' + name + '" data-group-id="' + (projectMap[name] || '') + '">' + name + '</option>'; }).join('');
    if (Object.prototype.hasOwnProperty.call(projectMap, currentProject)) project.value = currentProject;
    startInput.value = currentStart;
    endInput.value = currentEnd;
    channelInput.value = currentChannel;
    var activeRefresh = null; try { activeRefresh = JSON.parse(localStorage.getItem("dxw-data-refresh-progress") || "null"); } catch (e) {}
    var restoredPayload = activeRefresh ? null : currentFilterPayload();
    if (restoredPayload && (restoredPayload.startDate || restoredPayload.endDate)) {
      var restoredRows = localRows(restoredPayload);
      setStatus(restoredRows.length ? ("查询完成：已匹配 " + restoredRows.length + " 条明细。") : "查询完成：本地暂无匹配数据，需要后台抓取时请点“刷新数据”。", restoredRows.length ? "ok" : "fail");
    }
    syncDataRefreshStatus();
    document.getElementById('dxwDataApply').onclick = applyLocalQuery;
    document.getElementById('dxwDataRefresh').onclick = refreshDataRange;
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

(function () {
  function getDailyPayload() {
    var project = document.getElementById('reportProject');
    var current = document.getElementById('reportCurrentDate');
    var compare = document.getElementById('reportCompareDate');
    var channel = document.getElementById('reportChannel');
    var selected = project && project.selectedOptions ? project.selectedOptions[0] : null;
    return {
      projectName: selected ? (selected.textContent || selected.value || '') : (project ? project.value : ''),
      projectValue: project ? project.value : '',
      groupId: selected && selected.dataset ? (selected.dataset.groupId || '') : '',
      currentDate: current ? current.value : '',
      compareDate: compare ? compare.value : '',
      channel: channel ? (channel.value || 'ALL') : 'ALL',
      savedAt: Date.now()
    };
  }
  function saveDailyPayload() {
    try { localStorage.setItem('dxw-daily-report-last-query', JSON.stringify(getDailyPayload())); } catch (e) {}
  }
  function loadDailyPayload() {
    try { return JSON.parse(localStorage.getItem('dxw-daily-report-last-query') || '{}'); } catch (e) { return {}; }
  }
  function setProjectValue(project, saved) {
    if (!project || !saved) return;
    var options = Array.prototype.slice.call(project.options || []);
    var match = options.find(function (opt) { return opt.value === saved.projectValue || opt.value === saved.projectName || opt.textContent === saved.projectName; });
    if (match) project.value = match.value;
  }
  function rowsForDaily(payload) {
    var rows = [];
    try { rows = (window.ADSTAT_DATA && Array.isArray(window.ADSTAT_DATA.rows)) ? window.ADSTAT_DATA.rows : []; } catch (e) {}
    return rows.filter(function (row) {
      var rowProject = row.projectName || ((String(row.title || '') + ' ' + String(row.target || '') + ' ' + String(row.audienceKey || '') + ' ' + String(row.jump || '')).match(/\u7eed\u8d39|\u8fc7\u671f|\u5df2\u8fc7\u671f/) ? '\u77ed\u7ebf\u738b\u7eed\u8d39' : '\u77ed\u7ebf\u738b\u65b0\u5f00');
      return rowProject === payload.projectName && row.date === payload.currentDate && (!payload.channel || payload.channel === 'ALL' || row.channel === payload.channel);
    });
  }
  function restoreDailyPayload() {
    if ((location.hash || '').replace('#', '') !== 'dailyReport') return;
    var saved = loadDailyPayload();
    if (!saved || (!saved.projectName && !saved.currentDate)) return;
    var project = document.getElementById('reportProject');
    var current = document.getElementById('reportCurrentDate');
    var compare = document.getElementById('reportCompareDate');
    var channel = document.getElementById('reportChannel');
    setProjectValue(project, saved);
    if (current && saved.currentDate) current.value = saved.currentDate;
    if (compare && saved.compareDate) compare.value = saved.compareDate;
    if (channel && saved.channel) channel.value = saved.channel;
    if (typeof window.renderDailyReport === 'function') window.renderDailyReport();
    var payload = getDailyPayload();
    var rows = rowsForDaily(payload);
    var note = document.getElementById('dailyReportDateNote');
    if (note && payload.currentDate) {
      var suffix = rows.length ? ('\u5df2\u5339\u914d ' + rows.length + ' \u6761\u660e\u7ec6\u3002') : '\u5df2\u6062\u590d\u7b5b\u9009\u6761\u4ef6\uff0c\u4f46\u5f53\u524d\u6761\u4ef6\u4ecd\u672a\u5339\u914d\u5230\u660e\u7ec6\uff0c\u8bf7\u518d\u70b9\u51fb\u5237\u65b0\u6570\u636e\u3002';
      note.textContent = '\u65e5\u62a5\u65e5\u671f\uff1a' + payload.currentDate + '\uff0c\u5bf9\u6bd4\u65e5\u671f\uff1a' + (payload.compareDate || '\u65e0') + '\uff0c\u9879\u76ee\uff1a' + payload.projectName + '\uff0c\u53e3\u5f84\uff1a' + payload.channel + '\u3002' + suffix;
    }
  }
  function patchDailyRefreshPersistence() {
    var btn = document.getElementById('refreshDailyReportData');
    if (btn && btn.dataset.dxwDailyPersist !== '1') {
      btn.dataset.dxwDailyPersist = '1';
      btn.addEventListener('click', saveDailyPayload, true);
    }
    ['reportProject','reportCurrentDate','reportCompareDate','reportChannel'].forEach(function (id) {
      var el = document.getElementById(id);
      if (el && el.dataset.dxwDailyPersist !== '1') {
        el.dataset.dxwDailyPersist = '1';
        el.addEventListener('change', function () { saveDailyPayload(); setTimeout(restoreDailyPayload, 30); });
      }
    });
    restoreDailyPayload();
  }
  window.addEventListener('hashchange', function () { setTimeout(patchDailyRefreshPersistence, 150); });
  document.addEventListener('DOMContentLoaded', function () { setTimeout(patchDailyRefreshPersistence, 300); });
  setInterval(patchDailyRefreshPersistence, 1500);
  setTimeout(patchDailyRefreshPersistence, 500);
})();
/* DXW publish panel safety patch: local-only publishing controls and public permission hiding. */
(function () {
  function isLocalAdmin() {
    return location.protocol === 'file:' || location.hostname === '127.0.0.1' || location.hostname === 'localhost';
  }
  function byId(id) { return document.getElementById(id); }
  function setStatus(text, state) {
    var el = byId('publishStatus');
    if (!el) return;
    el.textContent = text;
    el.className = ('publish-status ' + (state || '')).trim();
  }
  function hidePublicOnlyBlocks() {
    var local = isLocalAdmin();
    document.querySelectorAll('.local-permission-section').forEach(function (el) {
      el.style.display = local ? '' : 'none';
    });
    if (!local) {
      document.querySelectorAll('.settings-card').forEach(function (card) {
        var title = card.querySelector('h3');
        if (title && title.textContent.trim() === '\u6743\u9650\u5206\u914d') card.style.display = 'none';
      });
      document.querySelectorAll('#view-settings h2').forEach(function (title) {
        if (title.textContent.trim() === '\u6743\u9650\u5206\u914d') {
          title.style.display = 'none';
          var next = title.nextElementSibling;
          if (next && next.classList.contains('table-wrap')) next.style.display = 'none';
        }
      });
    }
  }
  function saveTokenFromInput() {
    var input = byId('publishToken');
    var token = input ? input.value.trim() : '';
    if (token && token !== input.getAttribute('placeholder')) {
      try { localStorage.setItem('dxw-publish-config-v1:token', token); } catch (e) {}
    }
    try { return localStorage.getItem('dxw-publish-config-v1:token') || ''; } catch (e) { return token; }
  }
  function wirePublishButton() {
    var latest = byId('publishLatestVersion');
    if (latest && latest.dataset.dxwPublishSafe !== '1') {
      latest.dataset.dxwPublishSafe = '1';
      latest.addEventListener('click', async function (event) {
        event.preventDefault();
        event.stopPropagation();
        if (!isLocalAdmin()) { setStatus('\u516c\u5f00\u94fe\u63a5\u4e0d\u5141\u8bb8\u53d1\u5e03\uff0c\u8bf7\u5728\u672c\u5730\u9875\u9762\u64cd\u4f5c\u3002', 'fail'); return; }
        var token = saveTokenFromInput();
        if (!token) { setStatus('\u8bf7\u5148\u586b\u5199 GitHub \u53d1\u5e03\u4ee4\u724c\uff0c\u7136\u540e\u70b9\u201c\u4fdd\u5b58\u8bbe\u7f6e\u201d\u6216\u518d\u70b9\u4e00\u6b21\u53d1\u5e03\u3002', 'fail'); return; }
        latest.disabled = true;
        setStatus('\u6b63\u5728\u8bb0\u5f55\u5f53\u524d\u7248\u672c\u5e76\u53d1\u5e03\u5230\u516c\u5f00\u94fe\u63a5\uff0c\u8bf7\u7a0d\u5019...', '');
        try {
          if (typeof window.publishLatestVersion !== 'function') throw new Error('\u53d1\u5e03\u51fd\u6570\u672a\u52a0\u8f7d\uff0c\u8bf7 Ctrl+F5 \u5f3a\u5236\u5237\u65b0\u540e\u91cd\u8bd5\u3002');
          await window.publishLatestVersion();
        } catch (err) {
          setStatus('\u53d1\u5e03\u5931\u8d25\uff1a' + (err && err.message ? err.message : err), 'fail');
        } finally {
          latest.disabled = false;
        }
      }, true);
    }
    document.querySelectorAll('[data-publish-version]').forEach(function (btn) {
      if (btn.dataset.dxwPublishSafe === '1') return;
      btn.dataset.dxwPublishSafe = '1';
      btn.addEventListener('click', async function (event) {
        event.preventDefault();
        event.stopPropagation();
        var token = saveTokenFromInput();
        if (!token) { setStatus('\u8bf7\u5148\u586b\u5199 GitHub \u53d1\u5e03\u4ee4\u724c\uff0c\u7136\u540e\u518d\u53d1\u5e03\u8be5\u7248\u672c\u3002', 'fail'); return; }
        btn.disabled = true;
        setStatus('\u6b63\u5728\u53d1\u5e03\u8be5\u7248\u672c\uff0c\u8bf7\u7a0d\u5019...', '');
        try {
          if (typeof window.publishRecordToGithub !== 'function') throw new Error('\u7248\u672c\u53d1\u5e03\u51fd\u6570\u672a\u52a0\u8f7d\uff0c\u8bf7 Ctrl+F5 \u5f3a\u5236\u5237\u65b0\u540e\u91cd\u8bd5\u3002');
          await window.publishRecordToGithub(btn.dataset.publishVersion);
        } catch (err) {
          setStatus('\u53d1\u5e03\u5931\u8d25\uff1a' + (err && err.message ? err.message : err), 'fail');
        } finally {
          btn.disabled = false;
        }
      }, true);
    });
  }
  function patchPublishPanel() {
    hidePublicOnlyBlocks();
    wirePublishButton();
    if (typeof window.renderPublishVersions === 'function') {
      try { window.renderPublishVersions(); } catch (e) {}
    }
  }
  window.addEventListener('hashchange', function () { setTimeout(patchPublishPanel, 120); });
  document.addEventListener('DOMContentLoaded', function () { setTimeout(patchPublishPanel, 250); });
  setTimeout(patchPublishPanel, 500);
  setInterval(patchPublishPanel, 2000);
})();