# 🚀 SmartResumeAI

SmartResumeAI is an AI-powered resume analyzer that compares your resume with a job description (JD) and provides a real-time compatibility score using OpenAI's language models.

<img src="./screenshots/testing-preview.png" alt="Testing Screenshot" width="100%"/>

<img width="1920" height="1080" alt="Screenshot 2025-07-11 094428" src="https://github.com/user-attachments/assets/36065d06-b628-43a4-bc0d-72dd312dcde6" />


---

## 🧠 Features

- 🧾 Upload your resume (PDF)
- 📝 Paste any job description (JD)
- 🤖 OpenAI-powered semantic matching
- 📊 Get match percentage and feedback instantly
- ⚡ Fast & simple interface
- 🔐 Secure local resume processing

---

## ⚙️ Tech Stack

| Frontend         | Backend           | AI & Tools         |
|------------------|-------------------|--------------------|
| React.js         | Node.js + Express | OpenAI GPT API     |
| TypeScript       | MongoDB           | Puppeteer (PDF to text) |
| Tailwind CSS     |                   | Dotenv, CORS       |

---

## 📸 Screenshots

> ![alt text](<Screenshot 2025-07-23 140515.png>)


## 🛠️ How to Run Locally

```bash
# Clone the repo
git clone https://github.com/harshit847/SmartResumeAI.git
cd SmartResumeAI

# Install dependencies
cd client
npm install
npm run build

cd ../server
npm install
npm run build
npm start
