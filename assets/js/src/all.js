/**
 *
 *  Custom JS written by Wesley Zajicek
 * @author Wesley Zajicek - <https://github.com/wdzajicek>
 *
 *
 */
import '../../scss/main.scss';

let loadGapi = new Promise((res, rej) => {
  const script = document.createElement('script');

  script.setAttribute('defer', '');
  script.src = 'https://apis.google.com/js/api.js';
  script.onload = () => res(script);
  script.onerror = e => rej(new Error(e));
  document.head.append(script);
});

window.addEventListener('load', () => {
  if (document.getElementById('Data')) {
    loadGapi
      .then((script) => {
        import('./getSheetData')
        .then(({ default: getSheetData }) => getSheetData());
      })
    .catch(err => console.error(err))
  }
});
