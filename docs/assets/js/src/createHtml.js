const PARENT = document.getElementById('Data');

const embolden = str => str.replace(
  /\*([^\*]+)\*/g,
  `<strong>$1</strong>`
);

const createId = str => {
  return (
    str
      .replace(/\s/g, '-')
      .toLowerCase()
  );
}

function createHtml(response, captionString, isNewsReleasesBool) {
  const data = response.result.values;
  const tableRows = [...data].map(item => {
    if (isNewsReleasesBool) {
      const [title, url, description] = item;

      return (
        `\n<tr>
  <td><a href="${url}" target="_blank" rel="noopener noreferrer">${title}</a></td>
  <td>${embolden(description)}</td>
</tr>`
      );
    } else {
      const [title, url, date, description] = item;

      return (
        `\n<tr>
  <td><a href="${url}" target="_blank" rel="noopener noreferrer">${title}</a></td>
  <td>${date}</td>
  <td>${embolden(description)}</td>
</tr>`
      );
    }
  });

  const html = `<table class="margin--bottom--2">
  <caption id="${createId(captionString)}">${captionString}</caption>
  <thead>
    <tr>
      <th>Title</th>
      ${!isNewsReleasesBool ? '<th>Date</th>' : ''}
      <th>Description</th>
    </tr>
  </thead>
  <tbody>
    ${tableRows.join('')}
  </tbody>
</table>`;
  
  // PARENT.innerHTML = html;
  PARENT.insertAdjacentHTML('beforeend', html);
}

export default createHtml;
