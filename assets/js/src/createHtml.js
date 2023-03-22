const PARENT = document.getElementById('Data');

const embolden = str => str.replace(
  /\*([^\*]+)\*/g,
  `<strong>$1</strong>`
);

function createHtml(response) {
  const data = response.result.values;
  const tableRows = [...data].map(item => {
    const [title, url, description] = item;

    return (
      `\n<tr>
  <td><a href="${url}" target="_blank" rel="noopener noreferrer">${title}</a></td>
  <td>${embolden(description)}</td>
</tr>`
    );
  });

  const html = `<table>
  <caption>Latest CDC News Releases</caption>
  <thead>
    <tr>
      <th>Title</th>
      <th>Description</th>
    </tr>
  </thead>
  <tbody>
    ${tableRows.join('')}
  </tbody>
</table>`;
  
  PARENT.innerHTML = html;
}

export default createHtml;
