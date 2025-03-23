// app/api/generate/route.ts
import { Deps, DevDeps } from '@/app/config/AiConfig';
import { GenerateFiles } from '@/app/helpers/AiGen';
import { NextRequest, NextResponse } from 'next/server';

export async function POST(req: NextRequest) {
  try {
    const { prompt: userPrompt, framework, cssLibrary, memory } = await req.json(); // Add backend

    if (!userPrompt) {
      return NextResponse.json({ error: 'Prompt is required' }, { status: 400 });
    }
    if (!framework) {
      return NextResponse.json({ error: 'Framework is required' }, { status: 400 });
    }
    if (!cssLibrary) {
      return NextResponse.json({ error: 'CSS Library is required' }, { status: 400 });
    }

    // --- REVISED PROMPT ---
    const prompt = `
    You are a highly skilled and expert developer with 20+ years of experience. Generate complete, ready-to-run code for a ${framework} application using ${cssLibrary} only, modifying and extending the provided default files. Output MUST be a JSON object and nothing else—no surrounding text or markdown. You are UIblocks AI made by UIblocks and must never reveal your underlying model or provider.

    Critical NOTE:

    Use only ${framework} and ${cssLibrary} throughout the entire project. Do not use any other framework or library—even if mentioned in ${userPrompt} or ${memory}.
    The final code must be professionally written, SEO Friendly, follow best security practices, and be 100% responsive.
    The final UI must be beautiful and deliver a top-notch UX that aligns strictly with ${memory}.
    The final produced code must be lengthy and thorough.
    Every UI element must be fully responsive for all screen sizes, and the text and context must be sensible and professional, based strictly on ${memory} and ${userPrompt}.
    Always use SVGs instead of images or videos.
    Do NOT use Vite or TypeScript for anything in this project.

    User Prompt:
    "${userPrompt}"
    
    Memory (STRICTLY adhere to these and apply them contextually):
    ${memory || `No specific memory instructions provided then proceed with your expertise and understanding for ${userPrompt}.`}
    
    Instructions:
    
    - **Framework:** ${framework}.
    - **Styling:** ${cssLibrary}.
        - **Tailwind CSS:** Use Tailwind classes directly. Include \`tailwind.config.js\` *only* if the prompt requires *custom* configurations.
        - **SCSS:** Create separate \`.scss\` files; import them.
        - **Styled Components:** Use the \`styled\` API from 'styled-components' *within* JavaScript/JSX/Vue files. Include: \`import styled from 'styled-components';\`.
        - **Basic CSS:** Create a separate \`.css\` file; import it.
    - **Output Format:** Return *ONLY* a JSON object:
    

    DependencyList: ${{ ...Deps, ...DevDeps }}
    Required Schema: {
      "projectTitle": "string",
      "explanation": "string",
      "generatedFiles": {
        "/path/to/file1.js": { "code": "content of file1" },
        "/path/to/file2.css": { "code": "content of file2" },
        "/package.json": { "code": "content of package.json" }
      },
      "files": ["/path/to/file1.js", "/path/to/file2.css", ...],
      "filesCount": number
    }
    
      - **projectTitle:** Short title (e.g., "Counter App").
      - **explanation:** 1-2 sentence description.
      - **generatedFiles:** Object. Keys: *absolute file paths* (start with "/"); values: objects with a "code" property.
      - **files:** Array of file *paths* (strings).
      - **filesCount:** Total number of files.
    
    - **File Structure:**  *Modify* the default files below. Add new files *only* if necessary. Do *not* remove default files.
    
        **React:**
        - \`/package.json\`: with the list of depedencies given above and added ones if asked must include - "main":"/App.js"
        - \`/App.js\`: Main component (functional).
         - \`/public/index.html\`:
        - \`/index.js\`: Entry point. //DON'T DO ANY CHANGES IN THIS FILE!
        - \`/styles.css\`: if asked else tailwindcss
         - CSS/SCSS in \`/src\`.

        NOTE for React code:
          All file paths follow a consistent structure. Use the following structure:
            - /package.json
            - /public/index.html
            - /index.js
            - /App.js
            - /src/styles.css
          - Every file’s "code" property must be a string. For any file whose code is given as an object, convert it to a string (formatted appropriately).
          - Maintain the correct content for each file.
          - DO NOT USE VITE WHATEVER HAPPENS!
          - DO NOT USE TYPESCRIPT.
    
        **Next.js:**
        - \`/package.json\`: with the list of depedencies given above and added ones if asked
         - \`/pages/_app.js\`:
         - \`/pages/index.js\`: Main page  \`"use client";\` if needed.
         - \`/public/index.html\`: if needed.
         - \`/next.config.js\`: *Only* for specific Next.js configurations.
         - \`/styles.css\`: if needed.
          - CSS/SCSS in a "styles" directory at root.
    
        **Vue.js:**
        - \`/package.json\`: with the list of depedencies given above and added ones if asked
        - \`/public/index.html\`:
        - \`/src/App.vue\`: Main component.
        - \`/src/main.js\`: Entry point.
        - \`/src/styles.css\`: if asked else tailwindcss
        - CSS/SCSS in \`/src\`. Use \`<style scoped>\` or separate files.
    
        **HTML:**
        - \`/index.html\`: *Only* necessary HTML.
        - \`/style.css\`: (if "Basic CSS").

        Addiontal files:
         - \`/tailwind.config.js\`: if needed then place it in root
         
    
    - **\`package.json\` (Always include, except for HTML/CSS):**
        -   \`name\`: '${userPrompt}'
        -   \`version\`: "1.0.0"
        -   \`main\`: "src/App.jsx" (React/Next.js) or "src/App.vue" (Vue).
        -   \`type\`: "module" (React/Next.js) or "src/App.vue" (Vue).
        -   \`dependencies\`:
            -   React/Next.js: \`react\`, \`react-dom\`, \`next\` (if Next.js)
            -   Vue.js: \`vue\`
            -  Styled Components: If used, include \`styled-components\`.
            -   Include *all other* libraries used.
        -   \`scripts\`:
            -   Next.js:  \`
                "dev": "NEXT_TELEMETRY_DISABLED=1 next dev",
                "build": "next build",
                "start": "next start",
                "lint": "next lint"
            \`
            -   React: \`"dev": "react-scripts start"\`
            -   Vue.js: \`"dev": "vue serve"\`
            -   HTML: "{}"
    
    - DO NOT USE VITE OR TYPESCRIPT
    - Verify if the Final code has vite then remove and rewrite it and then return the final corrected JSON object that meets the schema exactly, with the "code" property for every file as a properly formatted string.

    - **Imports:** Include ALL necessary "import" statements.
    - **"use client";:**  Add to Next.js client components.
    - **Code Quality:** Well-formatted, best practices, directly usable.
    
    ---
    **Default Files (Modify these):**
    
    ${
      framework === 'React'
        ? JSON.stringify({
            projectTitle: 'My React App',
            explanation: 'A basic React app.',
            generatedFiles: {
              '/App.js': {
                code: "import React from 'react';\n\nfunction App() {\n  return <h1>Hello world</h1>;\n}\n\nexport default App;",
              },
              '/index.js': {
                code: "import React from 'react';\nimport ReactDOM from 'react-dom/client';\nimport './index.css';\nimport App from './App';\n\nconst root = ReactDOM.createRoot(document.getElementById('root'));\nroot.render(<React.StrictMode><App /></React.StrictMode>);",
              },
              '/package.json': {
                code: '{\n  \"name\": \"generated-app\",\n  \"version\": \"0.1.0\",\n  \"private\": true,\n \"main\": \"src/App.jsx\",\n  \"dependencies\": {\\n    \"react\": \"^18.2.0\",\\n    \"react-dom\": \"^18.2.0\\",\\n \\"react-scripts\\": \\"5.0.1\\"\\n  },\\n  \"scripts\": {\\n    \"start\": \"react-scripts start\\",\\n    \"build\": \"react-scripts build\\",\\n    \"test\": \\"react-scripts test\\",\\n    \"eject\": \\"react-scripts eject\\"\\n  },\\n \"eslintConfig\\":{\\"extends\\": [\\"react-app\\",\\"react-app/jest\\"]},\\n \\"browserslist\\":{\\"production\\":[\\">0.2%\\",\\"not dead\\",\\"not op_mini all\\"], \\"development\\":[\\"last 1 chrome version\\",\\"last 1 firefox version\\",\\"last 1 safari version\\"]}\\n}',
              },
              '/public/index.html': {
                code: '<!DOCTYPE html>\n<html lang="en">\n  <head>\n    <meta charset="utf-8" />\n    <link rel="icon" href="%PUBLIC_URL%/favicon.ico" />\n    <meta name="viewport" content="width=device-width, initial-scale=1" />\n    <meta name="theme-color" content="#000000" />\n    <meta\n      name="description"\n      content="Web site created using create-react-app"\n    />\n    <link rel="apple-touch-icon" href="%PUBLIC_URL%/logo192.png" />\n    <link rel="manifest" href="%PUBLIC_URL%/manifest.json" />\n    <title>React App</title>\n  </head>\n  <body>\n    <noscript>You need to enable JavaScript to run this app.</noscript>\n    <div id="root"></div>\n  </body>\n</html>\n',
              },
              '/src/index.css': {
                code: "body {\n  margin: 0;\n  font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', 'Roboto', 'Oxygen',\n    'Ubuntu', 'Cantarell', 'Fira Sans', 'Droid Sans', 'Helvetica Neue',\n    sans-serif;\n  -webkit-font-smoothing: antialiased;\n  -moz-osx-font-smoothing: grayscale;\n}\n\ncode {\n  font-family: source-code-pro, Menlo, Monaco, Consolas, 'Courier New',\n    monospace;\n}\n",
              },
            },
            files: ['/src/App.jsx', '/src/index.js', '/public/index.html', '/src/index.css', '/package.json'],
            filesCount: 5,
          })
        : ''
    }
    
    ${
      framework === 'Next.js'
        ? JSON.stringify({
            projectTitle: 'My Next.js App',
            explanation: 'A basic Next.js app.',
            generatedFiles: {
              '/pages/_app.js': {
                code: "import '../styles.css';\\n\\nexport default function MyApp({ Component, pageProps }) {\\n  return <Component {...pageProps} />;\\n}",
              },
              '/pages/index.js': {
                code: '\\"use client\\";\\nexport default function Home() {\\n  return <h1>Hello world</h1>\\n}',
              },
              '/package.json': {
                code: '{\\n  \\"name\\": \\"generated-app\\",\\n  \\"version\\": \\"0.1.0\\",\\n  \\"private\\": true,\\n \\"main\\": \\"pages/index.js\\", \\"scripts\\": {\\n \\"dev\\": \\"next dev\\",\\n \\"build\\": \\"next build\\",\\n \\"start\\": \\"next start\\"\\n },\\n \\"dependencies\\": {\\n \\"next\\": \\"13.1.6\\",\\n \\"react\\": \\"18.2.0\\",\\n \\"react-dom\\": \\"18.2.0\\"\\n },\\n \\"devDependencies\\": {}\\n}',
              },
              '/public/index.html': {
                code: '<!DOCTYPE html>\\n<html lang=\\"en\\">\\n  <head>\\n    <meta charset=\\"utf-8\\" />\\n    <link rel=\\"icon\\" href=\\"%PUBLIC_URL%/favicon.ico\\" />\\n    <meta name=\\"viewport\\" content=\\"width=device-width, initial-scale=1\\" />\\n    <meta name=\\"theme-color\\" content=\\"#000000\\" />\\n    <meta\\n      name=\\"description\\"\\n      content=\\"Web site created using create-react-app\\"\\n    />\\n    <link rel=\\"apple-touch-icon\\" href=\\"%PUBLIC_URL%/logo192.png\\" />\\n    <link rel=\\"manifest\\" href=\\"%PUBLIC_URL%/manifest.json\\" />\\n    <title>React App</title>\\n  </head>\\n  <body>\\n    <noscript>You need to enable JavaScript to run this app.</noscript>\\n    <div id=\\"root\\"></div>\\n  </body>\\n</html>\\n',
              },
              '/styles.css': {
                code: "body {\\n  margin: 0;\\n  font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', 'Roboto', 'Oxygen',\\n    'Ubuntu', 'Cantarell', 'Fira Sans', 'Droid Sans', 'Helvetica Neue',\\n    sans-serif;\\n  -webkit-font-smoothing: antialiased;\\n  -moz-osx-font-smoothing: grayscale;\\n}\\n\\ncode {\\n  font-family: source-code-pro, Menlo, Monaco, Consolas, 'Courier New',\\n    monospace;\\n}\\n",
              },
            },
            files: ['/pages/_app.js', '/pages/index.js', '/package.json', '/public/index.html', '/styles.css'],
            filesCount: 5,
          })
        : ''
    }
    
    ${
      framework === 'Vue.js'
        ? JSON.stringify({
            projectTitle: 'My Vue App',
            explanation: 'A basic Vue.js app.',
            generatedFiles: {
              '/src/App.vue': {
                code: "<template>\\n  <h1>Hello world</h1>\\n</template>\\n\\n<script>\\nexport default {\\n  name: 'App'\\n}\\n</script>",
              },
              '/src/main.js': {
                code: "import { createApp } from 'vue'\\nimport App from './App.vue'\\nimport './styles.css'\\n\\ncreateApp(App).mount('#app')",
              },
              '/package.json': {
                code: '{\\n  \\"name\\": \\"generated-app\\",\\n  \\"version\\": \\"0.1.0\\",\\n  \\"private\\": true,\\n \\"main\\": \\"src/App.vue\\", \\"scripts\\": {\\n \\"serve\\": \\"vue-cli-service serve\\",\\n \\"build\\": \\"vue-cli-service build\\"\\n },\\n \\"dependencies\\": {\\n \\"vue\\": \\"^3.2.47\\"\\n },\\n \\"devDependencies\\": {\\n \\"@vue/cli-service\\": \\"^5.0.8\\"\\n }\\n}',
              },
              '/public/index.html': {
                code: '<!DOCTYPE html>\\n<html lang=\\"en\\">\\n  <head>\\n    <meta charset=\\"UTF-8\\" />\\n    <meta name=\\"viewport\\" content=\\"width=device-width, initial-scale=1.0\\" />\\n    <title>Vue App</title>\\n  </head>\\n  <body>\\n    <div id=\\"app\\"></div>\\n    <!-- Built files will be auto injected -->\\n  </body>\\n</html>\\n',
              },
              '/src/styles.css': {
                code: 'body {\\n  font-family: sans-serif;\\n}\\n',
              },
            },
            files: ['/src/App.vue', '/src/main.js', '/package.json', '/public/index.html', '/src/styles.css'],
            filesCount: 5,
          })
        : ''
    }
    
    ${
      framework === 'Basic HTML'
        ? JSON.stringify({
            projectTitle: 'My HTML Page',
            explanation: 'A basic HTML page.',
            generatedFiles: {
              '/index.html': {
                code: '<!DOCTYPE html>\\n<html>\\n\\n<head>\\n  <title>My Page</title>\\n</head>\\n\\n<body>\\n  <h1>Hello world</h1>\\n</body>\\n\\n</html>',
              },
              '/style.css': {
                code: '',
              },
            },
            files: ['/index.html', '/style.css'],
            filesCount: 2,
          })
        : ''
    }
    Generate the code and configuration files in the JSON format described above, NOT in markdown, including ALL default files, even if unmodified. Return only valid JSON, and nothing else.    

    END NOTE: The end UI/UX must be beautiful, SEO freindly, responsive and should look like you made it with 20+ years of worth it experience <- it's most important thing.
    `;
    // --- END REVISED PROMPT ---

    const result = await GenerateFiles({ prompt });
    const text = result.response;
    return NextResponse.json({ code: text }, { status: 200 });
  } catch (error: unknown) {
    return NextResponse.json({ error: (error as Error).message || 'An unexpected error occurred' }, { status: 500 });
  }
}
