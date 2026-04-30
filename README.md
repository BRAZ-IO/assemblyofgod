# AI Assembly of God - Spiritual Assistant

**Complete customized religious AI system** with professional interface and proprietary processing engine. This project presents an independent artificial intelligence assistant solution for spiritual context, with real natural language processing capability and generation of contextualized responses based on the Word of God.

## 🙏 Main Features

### ✨ Religious Features
- 📖 **Online Bible** - Books, chapters and verses
- 🙏 **Prayer System** - Predefined and personalized prayers
- 🎵 **Hymns and Praises** - Lyrics and melodies for worship
- 👥 **Community** - Church members and functions
- 📅 **Events** - Church activity calendar
- 💬 **Spiritual Chat** - Bible-based counseling

### 🎨 Professional Interface
- **Modern Design**: Golden gradients and religious theme
- **Fully Responsive**: Works on all devices
- **Intuitive Navigation**: 4 organized main tabs
- **Reusable Components**: LoadingSpinner, BibleVerse, PrayerCard
- **Smooth Animations**: Fluid user experience

### 🤖 AI Assembly of God Engine

### Capabilities
- **Natural Language Processing**: Analysis and understanding of spiritual messages
- **Religious Context Detection**: Identifies prayers, bible, praise
- **Personalized Responses**: Based on biblical knowledge
- **Suggestion System**: Relevant spiritual recommendations
- **Continuous Context**: Maintains conversation history

### 📚 Spiritual Features
- **Biblical Responses**: Based on verses and teachings
- **Pastoral Counseling**: Personalized Christian guidance
- **Intent Detection**: Prayer, praise, bible study
- **Daily Verses**: Meditations for each day
- **Devotionals**: Spiritual reflections

## 🚀 How It Works

### Spiritual Flow
1. **User asks spiritual question** (ex: "How can I pray better?")
2. **AI detects religious context** (prayer, bible, praise)
3. **System consults biblical base** and spiritual knowledge
4. **Generates personalized response** based on the Word
5. **Offers spiritual follow-up** if needed

### Technologies Used
- **Frontend**: React 18 + Styled Components
- **Navigation**: React Router v6
- **Rendering**: React Markdown
- **Storage**: AsyncStorage (localStorage)
- **AI Engine**: Pure JavaScript (adapted NLP)

## 🛠️ Setup

### Installation
```bash
# Clone the repository
git clone https://github.com/YOUR-USER/AI-Assembly-God.git
cd AI-Assembly-God/frontend

# Install dependencies
npm install

# Start development server
npm start
```

### Optional Setup - Google Search
To enrich responses with online research:

1. **Get Google API Key**:
   - Go to [Google Cloud Console](https://console.cloud.google.com/)
   - Create a new project
   - Enable "Custom Search API"
   - Copy the API Key

2. **Create Search Engine ID**:
   - Go to [Google Custom Search](https://programmablesearchengine.google.com/)
   - Create a custom search engine
   - Copy the Search Engine ID (CX)

3. **Configure in AI Assembly of God**:
   - Go to **Settings** → **Google Search Integration**
   - Enter the **Google API Key**
   - Enter the **Search Engine ID (CX)**
   - Save settings

## 📁 Project Structure

```
frontend/
├── src/
│   ├── components/
│   │   ├── layout/
│   │   │   ├── Layout.js          # Main layout
│   │   │   ├── Sidebar.js         # Side navigation
│   │   │   └── TopBar.js          # Top bar
│   │   ├── chat/
│   │   │   └── ChatInterface.js   # Chat interface
│   │   └── common/
│   │       ├── LoadingSpinner.js  # Loading spinner
│   │       ├── BibleVerse.js      # Verse component
│   │       └── PrayerCard.js      # Prayer card
│   ├── pages/
│   │   ├── HomePage.js            # Home page
│   │   ├── ChatPage.js            # Spiritual chat
│   │   ├── BiblePage.js           # Online Bible
│   │   ├── PrayersPage.js         # Prayers
│   │   ├── HymnsPage.js           # Hymns
│   │   ├── CommunityPage.js       # Community
│   │   ├── EventsPage.js          # Events
│   │   ├── ProfilePage.js         # User profile
│   │   └── SettingsPage.js        # Settings
│   ├── services/
│   │   ├── AIAssemblyOfGodEngine.js  # AI engine
│   │   ├── NLPService.js          # Language processing
│   │   ├── SearchService.js       # Search service
│   │   └── GoogleSearchService.js # Google integration
│   ├── hooks/
│   │   └── useAIAssemblyOfGod.js # Custom hook
│   └── utils/
│       └── constants.js           # Application constants
├── public/
└── package.json
```

## 🎯 Religious Style - Spiritual Responses

**AI Assembly of God generates responses with spiritual focus:**

1. **Christian Greetings**
   - "Peace of the Lord! How can I help you?"
   - "Grace and peace! Welcome!"

2. **Biblical Foundation**
   - Responses based on verses
   - References to biblical passages
   - Solid Christian teachings

3. **Spiritual Follow-up**
   - "Would you like me to pray for you?"
   - "Can I counsel you with the Word?"

4. **Pastoral Tone**
   - Welcoming and loving language
   - Respect for religious context
   - Genuine Christian guidance

## 🌟 Design Highlights

### Religious Visual Identity
- **Meaningful Name**: AI Assembly of God
- **Spiritual Logo**: Golden and sacred theme
- **Thematic Colors**: Golden gradients (#f4c430, #8b4513)
- **Typography**: Clear and readable fonts

### Visual Elements
- **Golden Gradients**: Symbolizing divine glory
- **Religious Icons**: Cross, Bible, Prayer
- **Smooth Animations**: Reverent experience
- **Clean Layout**: Focus on spiritual content

## 📱 Complete Features

### Main Pages
1. **Home**: Daily verse, prayers, quick access
2. **Chat**: Spiritual conversation with AI
3. **Bible**: Complete reading of books and chapters
4. **Profile**: User settings

### Spiritual Features
- **Verse of the Day**: Updated daily meditations
- **Prayer System**: 6+ types of predefined prayers
- **Bible Search**: Find verses easily
- **Hymns**: Lyrics and melodies for praise
- **Community**: Meet church members
- **Events**: Activity calendar

## 🔧 Development

### Modern Technologies
- React 18 with Hooks
- Styled Components for styling
- React Router for navigation
- Local NLP for processing
- AsyncStorage for persistence

### Code Standards
- Functional components
- TypeScript (optional)
- Clean and organized code
- Reusable components
- Scalable architecture

## 📊 Project Status

### ✅ Implemented
- [x] Complete and professional interface
- [x] Functional AI engine
- [x] All religious pages
- [x] Navigation system
- [x] Local storage
- [x] Responsive design
- [x] Reusable components

### 🔄 In Development
- [ ] External API integration
- [ ] Authentication system
- [ ] Cloud synchronization
- [ ] Mobile application

## 🤝 Contributing

1. Fork the project
2. Create your branch (`git checkout -b feature/new-feature`)
3. Commit your changes (`git commit -m 'Adding new spiritual feature'`)
4. Push to the branch (`git push origin feature/new-feature`)
5. Open a Pull Request

## 📄 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 🙏 Acknowledgment

**AI Assembly of God** - Demonstration of how technology can serve faith and strengthen the spiritual life of the Christian community.
