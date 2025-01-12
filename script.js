document.getElementById('fileInput').addEventListener('change', handleFileUpload);
document.getElementById('generateStats').addEventListener('click', generateStatistics);

let chatData = [];
let user1 = '';
let user2 = '';

function handleFileUpload(event) {
  const file = event.target.files[0];
  if (file) {
    const reader = new FileReader();
    reader.onload = function(e) {
      const text = e.target.result;
      parseChatData(text);
      populateUserSelection();
    };
    reader.readAsText(file);
  }
}

function parseChatData(text) {
  // Split text into lines and parse each line
  const lines = text.split('\n');
  lines.forEach(line => {
    const parts = line.split(':');
    if (parts.length >= 2) {
      const user = parts[0].trim();
      const message = parts.slice(1).join(':').trim();
      chatData.push({ user, message });
    }
  });
}

function populateUserSelection() {
  const users = [...new Set(chatData.map(entry => entry.user))];
  const user1Select = document.getElementById('user1');
  const user2Select = document.getElementById('user2');
  
  users.forEach(user => {
    const option1 = document.createElement('option');
    option1.value = user;
    option1.textContent = user;
    user1Select.appendChild(option1);
    
    const option2 = document.createElement('option');
    option2.value = user;
    option2.textContent = user;
    user2Select.appendChild(option2);
  });
  
  document.getElementById('participantSelection').style.display = 'block';
}

function generateStatistics() {
  user1 = document.getElementById('user1').value;
  user2 = document.getElementById('user2').value;
  
  if (user1 && user2 && user1 !== user2) {
    const stats = analyzeChatData();
    displayStatistics(stats);
  } else {
    alert('Please select two different users.');
  }
}

function analyzeChatData() {
  const stats = {
    startOfChat: '',
    endOfChat: '',
    duration: '',
    messagesUser1: 0,
    messagesUser2: 0,
    longestMessageUser1: 0,
    longestMessageUser2: 0,
    interestLevel: 0,
    responseTimeUser1: 0,
    responseTimeUser2: 0,
    complimentsUser2: 0,
    timesBegged: 0,
    mostUsedEmojis: [],
    mostSaidPhraseUser1: '',
    mostSaidPhraseUser2: '',
    longestConversation: '',
    mostActiveDay: '',
    totalILoveYou: 0,
    totalIMissYou: 0,
    mostActiveHour: '',
    mostTalkedAboutTopic: '',
    totalEmojisUsed: 0,
  };
  
  // Analyze chat data and populate stats
  // (Implement the logic to analyze chat data and compute statistics)
  
  return stats;
}

function displayStatistics(stats) {
  document.getElementById('startOfChat').textContent = stats.startOfChat;
  document.getElementById('endOfChat').textContent = stats.endOfChat;
  document.getElementById('duration').textContent = `Chat Duration: ${stats.duration}`;
  document.getElementById('messagesUser1').textContent = `Messages Sent (${user1}): ${stats.messagesUser1}`;
  document.getElementById('messagesUser2').textContent = `Messages Sent (${user2}): ${stats.messagesUser2}`;
  document.getElementById('longestMessageUser1').textContent = `Longest Message (${user1}): ${stats.longestMessageUser1} words`;
  document.getElementById('longestMessageUser2').textContent = `Longest Message (${user2}): ${stats.longestMessageUser2} words`;
  document.getElementById('interestLevel').textContent = `${stats.interestLevel}%`;
  document.getElementById('interestDetails').textContent = `Your Interest Level (${user1}: ${stats.interestLevel}%, ${user2}: ${100 - stats.interestLevel}%)`;
  document.getElementById('interestFill').style.width = `${stats.interestLevel}%`;
  document.getElementById('responseTimeUser1').textContent = `Average Response Time (${user1}): ${stats.responseTimeUser1}`;
  document.getElementById('responseTimeUser2').textContent = `Average Response Time (${user2}): ${stats.responseTimeUser2}`;
  document.getElementById('complimentsUser2').textContent = `Compliments Given (${user2}): ${stats.complimentsUser2}`;
  document.getElementById('timesBegged').textContent = `Times You Begged to Stay Together: ${stats.timesBegged}`;
  
  const emojiList = document.getElementById('emojiList');
  emojiList.innerHTML = '';
  stats.mostUsedEmojis.forEach(emoji => {
    const li = document.createElement('li');
    li.textContent = `${emoji.emoji} - ${emoji.count} times (${emoji.user})`;
    emojiList.appendChild(li);
  });
  
  document.getElementById('mostSaidPhraseUser1').textContent = `Most Said Phrase (${user1})`;
  document.getElementById('mostSaidPhraseUser1Count').textContent = `${stats.mostSaidPhraseUser1} - ${stats.mostSaidPhraseUser1Count} times`;
  document.getElementById('mostSaidPhraseUser2').textContent = `Most Said Phrase (${user2})`;
  document.getElementById('mostSaidPhraseUser2Count').textContent = `${stats.mostSaidPhraseUser2} - ${stats.mostSaidPhraseUser2Count} times`;
  document.getElementById('longestConversation').textContent = `Longest Conversation`;
  document.getElementById('longestConversationDetails').textContent = `${stats.longestConversation}`;
  document.getElementById('mostActiveDay').textContent = `Most Active Day`;
  document.getElementById('mostActiveDayDetails').textContent = `${stats.mostActiveDay}`;
  document.getElementById('totalILoveYou').textContent = `Total "I Love You"`;
  document.getElementById('totalILoveYouDetails').textContent = `${stats.totalILoveYou} (${user1}), ${stats.totalILoveYou} (${user2})`;
  document.getElementById('totalIMissYou').textContent = `Total "I Miss You"`;
  document.getElementById('totalIMissYouDetails').textContent = `${stats.totalIMissYou} (${user1}), ${stats.totalIMissYou} (${user2})`;
  document.getElementById('mostActiveHour').textContent = `Most Active Hour`;
  document.getElementById('mostActiveHourDetails').textContent = `${stats.mostActiveHour}`;
  document.getElementById('mostTalkedAboutTopic').textContent = `Most Talked About Topic`;
  document.getElementById('mostTalkedAboutTopicDetails').textContent = `${stats.mostTalkedAboutTopic}`;
  document.getElementById('totalEmojisUsed').textContent = `Total Emojis Used`;
  document.getElementById('totalEmojisUsedDetails').textContent = `${stats.totalEmojisUsed} (${user1}), ${stats.totalEmojisUsed} (${user2})`;
  
  document.getElementById('stats').style.display = 'block';
}
