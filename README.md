# Token Refresh Coordinator

A comprehensive authentication and authorization project focused on secure JWT management, featuring **Sliding Window Token Refresh** and **Automated Key Rotation**. This project provides separate interfaces for **Admin** and **User** interactions, each with its own dedicated backend and frontend.

---

## Key Features

### Advanced Authentication
- **Dual Interfaces:** Dedicated **Admin** and **User** panels for separate authorization levels.
- **JWT-Based Security:** Robust session management using JSON Web Tokens.
- **Token Versioning:** Integrated session invalidation via `tokenVersion` stored in the database.
- **Sliding Window Refresh:** Smooth key rotation where tokens are validated against both current and previous access secrets to prevent sudden logouts during key rotation.

### Automated Key Rotation
- **Bash-Powered Rotation:** `rotate-keys.sh` automates the generation of new cryptographic secrets using OpenSSL.
- **Key Evolution Logging:** Automatically logs key rotation events in `ROTATION.md` with SHA256 hashes for secure audit trails.
- **Git Integration:** Version-controlled rotation logs for tracking key history without exposing secrets.
- **PM2 Support:** Optional automatic backend restarts to apply new keys in production environments.

### Modern UX/UI
- **Smooth Navigation:** Integrated with **Lenis** for enhanced scrolling experiences.
- **Responsive Design:** Styled with **Tailwind CSS (Vite)** for a modern, fluid interface.
- **Animations:** Powered by **Framer Motion** for interactive feedback.

---

## Tech Stack

- **Frontend:** React (Vite), Tailwind CSS, Framer Motion, Lenis.
- **Backend:** Node.js, Express, MongoDB (Mongoose), JWT, Bcrypt.
- **Security:** OpenSSL (Key Generation), SHA256 Checksum (Audit Logging).
- **DevOps:** Bash Scripting, PM2 (Process Management).

---

## Project Structure

```text
/
├── Admin/
│   ├── BACKEND/       # Admin API (Express)
│   └── Frontend/      # Admin Interface (React)
├── User/
│   ├── BACKEND/       # User API (Express)
│   └── FRONTEND/      # User Interface (React)
├── rotate-keys.sh     # Automation script for JWT key rotation
├── ROTATION.md        # Secure audit log for key evolution
└── README.md          # Project documentation
```

---

## Getting Started

### 1. Prerequisites
- **Node.js** (v24+)
- **MongoDB** (running locally or via Atlas)
- **OpenSSL** (for key rotation script)

### 2. Backend Setup (Admin & User)
For both `Admin/BACKEND` and `User/BACKEND`:
1. Navigate to the directory: `cd Admin/BACKEND` or `cd User/BACKEND`
2. Install dependencies: `npm install`
3. Configure Environment Variables: Create a `.env` file based on `.env-example`:
4. Start the server using pm2

### 3. Frontend Setup (Admin & User)
For both `Admin/Frontend` and `User/FRONTEND`:
1. Navigate to the directory: `cd Admin/Frontend` or `cd User/FRONTEND`
2. Install dependencies: `npm install`
3. Start the development server: `npm run dev`

---

##  Key Rotation Usage

To rotate your JWT secrets manually:
1. Ensure the `rotate-keys.sh` script has execute permissions: `chmod +x rotate-keys.sh`
2. Run the script: `./rotate-keys.sh`

**What happens?**
- Current secrets are moved to `JWT_PREVIOUS_...` variables in your `.env`.
- New secrets are generated and stored in `JWT_ACCESS_SECRET`.
- The rotation is logged in `ROTATION.md` with a timestamp and a hash of the new key.
- A git commit is automatically made for the `ROTATION.md` file.

---

## Deployment via GCP (Google Cloud Platform)

### 1. VM Instance Setup
1. **Create Instance:** Create a VM instance (`e2-small`) with **Ubuntu 24.04 LTS**.
2. **Disk:** Allocate at least 20GB Standard Persistent Disk.
3. **Firewall:** Enable **Allow HTTP traffic** and **Allow HTTPS traffic**.
4. **Networking:** In the "Network tags" section, ensure `http-server` and `https-server` tags are present.

### 2. Environment Preparation
SSH into your VM and run the following to install dependencies:

```bash
# Update system
sudo apt update && sudo apt upgrade -y

# Install Node.js (LTS)
curl -fsSL https://deb.nodesource.com/setup_24.x | sudo -E bash -
sudo apt install -y nodejs

# Install MongoDB
sudo apt-get install -y gnupg curl
curl -fsSL https://pgp.mongodb.com/server-8.0.asc | sudo gpg -o /usr/share/keyrings/mongodb-server-8.0.gpg --dearmor
echo "deb [ arch=amd64,arm64 signed-by=/usr/share/keyrings/mongodb-server-8.0.gpg ] https://repo.mongodb.org/apt/ubuntu noble/mongodb-org/8.2 multiverse" | sudo tee /etc/apt/sources.list.d/mongodb-org-8.2.list
sudo apt update && sudo apt install -y mongodb-org
sudo systemctl enable mongod && sudo systemctl start mongod

# Install Nginx & PM2
sudo apt install -y nginx
sudo systemctl enable nginx && sudo systemctl start nginx
sudo npm install -g pm2
```

### 3. Application Deployment
1. **Clone & Install:**
   ```bash
   git clone https://github.com/shauryasinghoops/Token-Refresh-Coordinator
   cd Token-Refresh-Coordinator
   # npm install for all 4 directories (Admin/BACKEND, Admin/Frontend, User/BACKEND, User/FRONTEND)
   ```
2. **Build Frontends:**
   ```bash
   cd Admin/Frontend && npm run build
   cd ../../User/FRONTEND && npm run build
   ```
3. **Start Backends with PM2:**
   ```bash
   cd Admin/BACKEND && pm2 start server.js --name admin-backend
   cd ../../User/BACKEND && pm2 start server.js --name user-backend
   ```
4. **Nginx Reverse Proxy Configuration**
Configure Nginx to route traffic to your backends and serve static frontend files.
Note: Run `sudo nginx -t && sudo systemctl restart nginx` after editing.

5. **Automated Key Rotation (Cron)**
To automate the rotation script every 24 hours:
```bash
crontab -e
# Add this line:
0 0 * * * /bin/bash /path/to/rotate-keys.sh >> /path/to/rotation_log.txt 2>&1
```