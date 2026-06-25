import { spawn } from "node:child_process";

const host = "127.0.0.1";
const port = "4173";
const baseURL = `http://${host}:${port}`;
const isWindows = process.platform === "win32";

function spawnNode(args, options = {}) {
  return spawn(process.execPath, args, {
    stdio: options.stdio ?? "inherit",
    env: options.env ?? process.env,
    shell: false,
    windowsHide: true,
  });
}

function wait(ms) {
  return new Promise(resolve => setTimeout(resolve, ms));
}

async function waitForServer(url, timeoutMs = 30_000) {
  const started = Date.now();
  while (Date.now() - started < timeoutMs) {
    try {
      const response = await fetch(url);
      if (response.ok) return;
    } catch {
      // Keep polling until Vite preview is ready.
    }
    await wait(500);
  }
  throw new Error(`Timed out waiting for ${url}`);
}

function stopProcessTree(child) {
  if (!child.pid || child.killed) return;

  if (isWindows) {
    spawn("taskkill", ["/pid", String(child.pid), "/T", "/F"], {
      stdio: "ignore",
      windowsHide: true,
    });
    return;
  }

  child.kill("SIGTERM");
}

const preview = spawnNode([
  "./node_modules/vite/bin/vite.js",
  "preview",
  "--host",
  host,
  "--port",
  port,
]);

let exitCode = 1;

try {
  await waitForServer(baseURL);

  const playwrightArgs = ["./node_modules/playwright/cli.js", "test", ...process.argv.slice(2)];
  const testProcess = spawnNode(playwrightArgs, {
    env: {
      ...process.env,
      AUREON_E2E_BASE_URL: baseURL,
    },
  });

  exitCode = await new Promise(resolve => {
    testProcess.on("exit", code => resolve(code ?? 1));
  });
} catch (error) {
  console.error(error instanceof Error ? error.message : error);
  exitCode = 1;
} finally {
  stopProcessTree(preview);
}

process.exit(exitCode);
