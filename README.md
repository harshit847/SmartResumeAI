# 🚀 SmartResumeAI

SmartResumeAI is an AI-powered resume analyzer that compares your resume with a job description (JD) and provides a real-time compatibility score using OpenAI's language models.

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

<img width="1919" height="865" alt="Screenshot 2025-07-23 140515" src="https://github.com/user-attachments/assets/b6073dce-2967-4530-afb8-5c3b5d8b64ad" />


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
