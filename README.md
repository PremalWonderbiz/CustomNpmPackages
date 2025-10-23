# 📦 Custom NPM Packages Monorepo

![npm](https://img.shields.io/badge/npm-packages-blue)
![TypeScript](https://img.shields.io/badge/built%20with-TypeScript-3178c6)

A centralized monorepo that hosts all of our **custom-built npm packages**.  
Each package is independent, versioned, and TypeScript-ready — designed for real-world Node.js and frontend applications.

---

## 🗂️ Repository Structure

custom-npm-packages/
│   ├── myawesomepackage/                  
│   ├── simple-caluclator/             
│   └── ...                       # Additional packages
├── package.json
└── README.md



Each folder inside `packages/` is a standalone npm module.

---

## 🚀 Getting Started

### 1️⃣ Clone the Repository

```bash
git clone https://github.com/<your-username>/CustomNpmPackages.git
cd CustomNpmPackages
````

### 2️⃣ Navigate to a Specific Package

```bash
cd packages/logger
```

### 3️⃣ Install Dependencies (if any)

```bash
npm install
```

---

### Example `package.json`

```json
{
  "name": "@mycompany/logger",
  "version": "1.0.0",
  "description": "A lightweight colorized logger for Node.js apps",
  "main": "dist/index.js",
  "types": "dist/index.d.ts",
  "scripts": {
    "build": "tsc",
    "test": "echo \"No tests yet\""
  },
  "keywords": ["logger", "typescript", "utility"],
  "author": "Premal Kadam",
  "type": "commonjs"
}
```

---

## ⚙️ Building the Package

From inside the package directory:

```bash
npm run build
```

This compiles TypeScript → JavaScript and outputs to the `dist/` folder.

---

## 🆙 Version Management

Use npm’s built-in versioning commands:

| Command             | Description                 | Example         |
| ------------------- | --------------------------- | --------------- |
| `npm version patch` | Bug fixes                   | `1.0.0 → 1.0.1` |
| `npm version minor` | Backward-compatible feature | `1.0.0 → 1.1.0` |
| `npm version major` | Breaking change             | `1.0.0 → 2.0.0` |

Each command automatically updates `package.json` and creates a git tag.

---

## 📤 Publishing Packages

### 🧱 Publish to Local Verdaccio Registry

If you’re using a local private registry:

```bash
npm set registry http://localhost:4873/
npm login --registry http://localhost:4873/
npm publish
```

View published packages at [http://localhost:4873](http://localhost:4873)

---

### 🌍 Publish to npmjs (Public Registry)

Switch back to npm’s public registry:

```bash
npm set registry https://registry.npmjs.org/
npm login
npm publish --access public
```

---

## 🧠 Installing Packages

| Registry              | Command                                                           |
| --------------------- | ----------------------------------------------------------------- |
| **Verdaccio (local)** | `npm install @mycompany/logger --registry http://localhost:4873/` |
| **npmjs (public)**    | `npm install @mycompany/logger`                                   |

---

## 🔁 Local Development with Symlinks

To test your package locally without publishing:

```bash
# Inside the package directory
cd packages/logger
npm link

# In your consuming project
npm link @mycompany/logger
```

This links the package globally for development.

---

## ⚒️ TypeScript Configuration Example

**tsconfig.json**

```json
{
  "compilerOptions": {
    "target": "ES2019",
    "module": "CommonJS",
    "declaration": true,
    "outDir": "dist",
    "strict": true,
    "esModuleInterop": true,
    "skipLibCheck": true
  },
  "include": ["src"]
}
```

---

## 🔒 Scoped Registries Setup

Your `.npmrc` file should look like this:

```ini
registry=https://registry.npmjs.org/
@mycompany:registry=http://localhost:4873/
//localhost:4873/:_authToken=<token>
```

**Behavior:**

* Packages starting with `@mycompany/` → Verdaccio
* All others → npmjs.org

Check active registries:

```bash
npm config get registry
npm config get @mycompany:registry
```

---

## 🧭 Development Workflow

| Step | Command                         | Description                    |
| ---- | ------------------------------- | ------------------------------ |
| 1️⃣  | `cd packages/logger`            | Enter desired package          |
| 2️⃣  | `npm run build`                 | Compile TypeScript             |
| 3️⃣  | `npm version patch`             | Bump version                   |
| 4️⃣  | `npm publish`                   | Publish to configured registry |
| 5️⃣  | `npm install @mycompany/logger` | Consume the package            |

---

## 🧱 Adding a New Package

```bash
mkdir my-new-package && cd my-new-package
npm init -y
npm install typescript --save-dev
npx tsc --init
```

Add your source file:

```bash
mkdir src && echo "export const hello = () => console.log('Hello from new package');" > src/index.ts
```

Build and publish:

```bash
npm run build
npm publish
```

---

## 🧰 Recommended Tooling

| Tool                   | Purpose                                         |
| ---------------------- | ----------------------------------------------- |
| **Verdaccio**          | Local npm registry for testing private packages |
| **TypeScript**         | Strong typing and modular builds                |
| **ESLint + Prettier**  | Linting & formatting                            |
| **Changesets / Lerna** | Manage multiple packages in a monorepo          |
| **npm link**           | Local testing before publishing                 |

---

## 🧑‍💻 Author

**Premal Kadam**
*Full Stack Developer*
Passionate about building modular, reusable, and TypeScript-driven npm libraries.

🔗 [GitHub Profile](https://github.com/PremalWonderbiz)

---
