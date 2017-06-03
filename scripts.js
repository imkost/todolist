const uiApp = document.querySelector('.todoapp');
const uiInput = document.querySelector('.new-todo');
const uiList = document.querySelector('.todo-list');
const uiCounter = document.querySelector('.todo-count strong')
const uiToggleAll = document.querySelector('.toggle-all');
let count = 2;

window.addEventListener('hashchange', onHashChange);
uiList.addEventListener('click', onListClick);
uiInput.addEventListener('keydown', onInputKeyDown);
uiToggleAll.addEventListener('click', onToggleAllClick);
onHashChange({ newURL: location.hash });

function onHashChange(e) {
  const filter = e.newURL.split('#/')[1];
  document.querySelector('.filters a.selected').classList.remove('selected');
  document.querySelector(`.filters a[href="#/${filter}"]`).classList.add('selected');
  uiApp.className = `todoapp ${filter}`;
}

function onInputKeyDown(e) {
  if (e.keyCode === 13) {
    const div = document.createElement('div');
    div.innerHTML = `
      <li>
        <div class="view">
          <input class="toggle" type="checkbox">
          <label>${uiInput.value}</label>
          <button class="destroy"></button>
        </div>
      </li>
    `;
    uiList.insertBefore(div.children[0], uiList.children[0]);
    uiInput.value = '';
    uiToggleAll.checked = false;
    count++;
    redrawCounter();
  }
}

function onListClick(e) {
  const { target } = e;
  const targetClassList = target.classList;

  if (targetClassList.contains('destroy')) {
    const item = target.parentElement.parentElement;
    item.remove();

    if (!item.classList.contains('complete')) {
      count--;
      redrawCounter();
    }
  } else if (targetClassList.contains('toggle')) {
    const item = target.parentElement.parentElement;
    count += item.classList.contains('complete') ? 1 : -1;
    redrawCounter();
    item.classList.toggle('complete');
    uiToggleAll.checked = false;
  }
}

function onToggleAllClick() {
  const items = document.querySelectorAll('.todo-list li');

  if (uiToggleAll.checked) {
    count = 0;

    // Complete all
    items.forEach(elem => {
      elem.classList.add('complete');
      elem.querySelector('.toggle').checked = true;
    });

  } else {
    count = items.length;

    // Incomplete all
    items.forEach(elem => {
      elem.classList.remove('complete');
      elem.querySelector('.toggle').checked = false;
    });
  }

  redrawCounter();
}

function redrawCounter() {
  uiCounter.innerText = count;
}
