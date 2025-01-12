document.getElementById('uploadForm').addEventListener('submit', async (e) => {
  e.preventDefault();
  const file = document.getElementById('chatFile').files[0];
  const girlName = document.getElementById('girlName').value;
  const manName = document.getElementById('manName').value;

  if (file && girlName && manName) {
    const reader = new FileReader();
    reader.onload = function(event) {
      const chatContent = event.target.result;
      const stats = processChat(chatContent, girlName, manName);
      displayStats(stats);
    };
    reader.readAsText(file);
  } else {
    alert('Please fill out all fields and upload a file!');
  }
});

function processChat(chatContent, girlName, manName) {
  const lines = chatContent.split('\n');
  const stats = {
    girlMessages: 0,
    manMessages: 0,
  };

  lines.forEach(line => {
    if (line.includes(girlName)) stats.girlMessages++;
    if (line.includes(manName)) stats.manMessages++;
  });

  return stats;
}

function displayStats(stats) {
  const outputDiv = document.getElementById('output');
  outputDiv.innerHTML = `
    <div class="stat">Girl's Messages: ${stats.girlMessages}</div>
    <div class="stat">Man's Messages: ${stats.manMessages}</div>
  `;
}
