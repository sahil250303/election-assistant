document.addEventListener('DOMContentLoaded', () => {
    const chatForm = document.getElementById('chat-form');
    const userInput = document.getElementById('user-input');
    const chatWindow = document.getElementById('chat-window');
    const quickBtns = document.querySelectorAll('.quick-btn');

    // FAQ Knowledge Base for the Assistant
    const knowledgeBase = {
        'register': 'To register, you need to be a citizen and meet the age requirement. You can usually register online, by mail, or in person at your local election office. The deadline is typically 15-30 days before the election.',
        'deadline': 'Key deadlines usually include: \n- Voter Registration: October 15\n- Request Mail Ballot: October 20\n- Early Voting: Oct 24 - Nov 1\n- Election Day: Nov 5.',
        'where': 'Your polling location depends on your registered address. You can find your exact polling place by visiting your state or local election board website and entering your address.',
        'how': 'You can vote in person on Election Day, participate in early voting if available in your state, or request a mail-in absentee ballot. Make sure to bring a valid ID if your state requires it.',
        'id': 'Voter ID requirements vary by state. Some require a photo ID (like a driver\'s license or passport), others accept non-photo ID (like a utility bill), and some require no ID if you sign an affidavit.',
        'default': 'I\'m not entirely sure about that specific detail. You can always check your official state election website for the most accurate and up-to-date information regarding the process.'
    };

    function addMessage(text, isUser = false) {
        const msgDiv = document.createElement('div');
        msgDiv.className = `message ${isUser ? 'user-msg' : 'assistant-msg'}`;
        
        const avatar = document.createElement('div');
        avatar.className = 'msg-avatar';
        avatar.textContent = isUser ? '👤' : '🗳️';
        
        const content = document.createElement('div');
        content.className = 'msg-content';
        
        // Handle newlines
        const lines = text.split('\n');
        lines.forEach((line, index) => {
            const span = document.createElement('span');
            span.textContent = line;
            content.appendChild(span);
            if (index < lines.length - 1) {
                content.appendChild(document.createElement('br'));
            }
        });
        
        msgDiv.appendChild(avatar);
        msgDiv.appendChild(content);
        
        chatWindow.appendChild(msgDiv);
        chatWindow.scrollTop = chatWindow.scrollHeight;
    }

    function getResponse(userText) {
        const lowerText = userText.toLowerCase();
        
        if (lowerText.includes('register') || lowerText.includes('registration')) {
            return knowledgeBase['register'];
        } else if (lowerText.includes('deadline') || lowerText.includes('when') || lowerText.includes('date')) {
            return knowledgeBase['deadline'];
        } else if (lowerText.includes('where') || lowerText.includes('location') || lowerText.includes('place')) {
            return knowledgeBase['where'];
        } else if (lowerText.includes('how')) {
            return knowledgeBase['how'];
        } else if (lowerText.includes('id') || lowerText.includes('identification')) {
            return knowledgeBase['id'];
        }
        
        return knowledgeBase['default'];
    }

    function handleUserInput(text) {
        if (!text.trim()) return;
        
        // Add user message
        addMessage(text, true);
        
        // Clear input
        userInput.value = '';
        
        // Simulate thinking delay
        setTimeout(() => {
            const response = getResponse(text);
            addMessage(response, false);
        }, 600);
    }

    chatForm.addEventListener('submit', (e) => {
        e.preventDefault();
        handleUserInput(userInput.value);
    });

    quickBtns.forEach(btn => {
        btn.addEventListener('click', () => {
            handleUserInput(btn.textContent);
        });
    });
});
