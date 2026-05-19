/**
 *
 *  Custom JS written by Wesley Zajicek
 * @author Wesley Zajicek - <https://github.com/wdzajicek>
 * 
 * NOTE: confetti.js code modified from <https://codepen.io/coopergoeke/pen/wvaYMbJ>
 *
 */
import '../../scss/main.scss';

window.addEventListener('load', () => {
  if (document.getElementById('Data')) {
    import('./getSheetData')
      .then(({ default: getSheetData }) => getSheetData());
  }

  if (document.getElementById('button')) {
    import('./confetti').then(({default: confetti}) => confetti());
  }
});
