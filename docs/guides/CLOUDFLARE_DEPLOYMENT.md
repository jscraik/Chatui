# Cloudflare Workers Deployment Guide

## 🚀 **Deploy ChatUI Widgets to Cloudflare Workers**

This guide shows how to deploy the ChatUI widget library to Cloudflare Workers, making your widgets available as a production MCP server for OpenAI integration.

## 📋 **What You Get**

- **Edge deployment** on Cloudflare's global network
- **Auto-discovery** of all ChatUI widgets
- **Content hashing** for cache busting
- **MCP server** ready for OpenAI ChatGPT integration
- **Durable Objects** for persistent state
- **Production-ready** error handling and logging

## 🏗 **Architecture Overview**

```
┌─────────────────┐    ┌──────────────────┐    ┌─────────────────┐
│   ChatGPT       │───▶│ Cloudflare       │───▶│ ChatUI Widgets  │
│   (OpenAI)      │    │ Workers Edge     │    │ (Your Library)  │
└─────────────────┘    └──────────────────┘    └─────────────────┘
                              │
                              ▼
                       ┌──────────────────┐
                       │ MCP Server       │
                       │ /mcp endpoint    │
                       └──────────────────┘
```

**Flow:**

1. ChatGPT calls your MCP server at `https://your-app.workers.dev/mcp`
2. Cloudflare Workers serves the MCP protocol
3. Widgets are served from Cloudflare Assets with content hashing
4. State persists via Durable Objects

## 🛠 **Setup Instructions**

### Step 1: Prepare Your Environment

```bash
# Ensure widgets are built
pnpm -C packages/widgets build

# Navigate to the deployment template
cd packages/cloudflare-template

# Install dependencies
pnpm install

# Copy environment configuration
cp .env.example .env
```

### Step 2: Configure Environment

Edit `.env` with your Cloudflare Workers domain:

```bash
# Required: Your Cloudflare Workers domain
WORKER_DOMAIN_BASE="https://my-chatui-widgets.your-subdomain.workers.dev"

# Optional: Domain shown to users in ChatGPT
WIDGET_DOMAIN="https://your-company.com"
```

### Step 3: Authenticate with Cloudflare

```bash
# Login to Cloudflare (if not already done)
npx wrangler login

# Generate types for your worker
pnpm cf-typegen
```

### Step 4: Deploy

```bash
# Build and deploy in one command
pnpm build-deploy

# Or step by step
pnpm build    # Copies widgets and builds worker
pnpm deploy   # Deploys to Cloudflare Workers
```

### Step 5: Test Your Deployment

```bash
# Check if your MCP server is responding
curl https://your-app.your-subdomain.workers.dev/mcp

# Should return MCP server information
```

## 🔧 **Customization**

### Adding Custom Tools

Edit `packages/cloudflare-template/src/worker/index.ts`:

```typescript
// In the registerExampleTools() method
this.server.registerTool(
  "my_custom_tool",
  {
    title: "My Custom Tool",
    description: "Does something amazing with my widgets",
    _meta: {
      "openai/outputTemplate": `ui://widget/${widgetManifest["my-widget"].uri}`,
      "openai/toolInvocation/invoking": "Processing...",
      "openai/toolInvocation/invoked": "Complete!",
      "openai/widgetAccessible": true,
    },
  },
  async (args, { _meta } = {}) => {
    // Your custom logic here
    return {
      content: [{ type: "text", text: "Custom tool executed!" }],
      structuredContent: {
        result: "success",
        data: args,
      },
    };
  }
);
```

### Environment-Specific Configuration

The deployment automatically configures:

- **CSP headers** based on your domains
- **Resource domains** for widget loading
- **Cache headers** for optimal performance

### Widget State Persistence

Durable Objects provide persistent state:

```typescript
// Widgets can use persistent state via useWidgetState()
const [state, setState] = useWidgetState<MyStateType>();

// State persists across:
// - Conversation turns
// - Widget reloads  
// - Server restarts
```

## 📊 **Deployment Process**

### Build Phase

1. **Widget Discovery**: Scans `@chatui/widgets` for all widgets
2. **Asset Copying**: Copies HTML, CSS, JS files to `dist/client`
3. **Manifest Generation**: Creates manifest with content hashes
4. **Worker Build**: Compiles TypeScript worker code

### Deploy Phase

1. **Asset Upload**: Uploads widget files to Cloudflare Assets
2. **Worker Deploy**: Deploys MCP server to Cloudflare edge
3. **DNS Update**: Makes your MCP server available globally

### Runtime

1. **Auto-Registration**: All widgets become MCP resources
2. **Tool Availability**: Custom tools are available to ChatGPT
3. **Edge Serving**: Widgets served from nearest Cloudflare edge

## 🔗 **ChatGPT Integration**

After successful deployment, you need to add your MCP server to ChatGPT. Here's the complete process:

### Step 1: Get Your MCP Server URL

After deployment, your MCP server will be available at:

```
https://your-app.your-subdomain.workers.dev/mcp
```

**Example URLs:**

- `https://chatui-widgets.example.workers.dev/mcp`
- `https://my-company-widgets.johndoe.workers.dev/mcp`

### Step 2: Test Your MCP Server

Before adding to ChatGPT, verify it's working:

```bash
# Test the MCP endpoint
curl https://your-app.your-subdomain.workers.dev/mcp

# Should return MCP server capabilities
# Look for your widgets in the resources list
```

### Step 3: Add to ChatGPT

**Enable Developer Mode First**

1. **Navigate to ChatGPT Settings**:
   - Go to **Settings → Apps & Connectors → Advanced settings** (bottom of page)
   - **Toggle Developer Mode** (if your organization allows it)
   - You should now see a **Create** button under **Settings → Apps & Connectors**

**Create Your Connector**

1. **Create the Connector**:
   - Click **Settings → Apps & Connectors → Create**
   - Fill in the connector details:
     - **Connector name**: `ChatUI Widgets` (or your preferred name)
     - **Description**: `Interactive widgets powered by ChatUI library with dashboard, tables, and enhanced UI components`
     - **Connector URL**: `https://your-app.your-subdomain.workers.dev/mcp`
   - Click **Create**

2. **Verify Connection**:
   - If successful, you'll see a list of tools your server advertises
   - Look for tools like `show_dashboard`, `show_enhanced_example`, etc.
   - If it fails, check the troubleshooting section below

**Alternative Methods**

**Option B: Via API Playground (for testing)**

1. **Open API Playground**: Visit [platform.openai.com/playground](https://platform.openai.com/playground)
2. **Add MCP Server**: Choose **Tools → Add → MCP Server**
3. **Enter URL**: `https://your-app.your-subdomain.workers.dev/mcp`
4. **Test directly**: Issue prompts and inspect JSON request/response pairs

**Option C: Local Development with ngrok**

For local testing during development:

```bash
# In one terminal: start your local server
cd packages/cloudflare-template
pnpm dev

# In another terminal: expose via ngrok
ngrok http 8787

# Use the ngrok URL in ChatGPT: https://abc123.ngrok.app/mcp
```

### Step 4: Verify Integration

After adding the MCP server:

1. **Start a new conversation** in ChatGPT
2. **Test basic functionality:**

   ```
   User: "Show me the dashboard"
   User: "Display the enhanced example widget"
   User: "Can you show me available widgets?"
   ```

3. **Look for widget responses** - you should see interactive widgets appear
4. **Check for errors** - if widgets don't load, check the browser console

### Step 5: Troubleshoot Common Issues

**"MCP server not responding"**

- Verify your worker is deployed: `curl https://your-app.workers.dev/mcp`
- Check Cloudflare Workers logs: `npx wrangler tail`
- Ensure environment variables are set correctly

**"Widgets not loading"**

- Check browser console for CSP errors
- Verify `WIDGET_DOMAIN` is set correctly in your environment
- Test individual widget URLs in browser

**"Tools not available"**

- Confirm MCP server shows your tools: `curl https://your-app.workers.dev/mcp`
- Check that widget manifest was generated correctly
- Verify no TypeScript errors in worker deployment

### Step 6: Share with Your Team

Once working, you can share the MCP server URL with your team:

```
MCP Server: https://your-app.your-subdomain.workers.dev/mcp
Available Tools:
- show_dashboard: Interactive analytics dashboard
- show_enhanced_example: Feature demonstration widget
- [your custom tools...]

Add this URL to ChatGPT to access interactive widgets!
```

## 🎯 **Example ChatGPT Interactions**

After successful integration, you can use commands like:

```
🗣️ User: "Show me the dashboard"
🤖 ChatGPT: [Displays interactive dashboard widget with stats and charts]

🗣️ User: "Display the enhanced example widget"  
🤖 ChatGPT: [Shows widget with theme detection, device info, and interactive elements]

🗣️ User: "What widgets are available?"
🤖 ChatGPT: I have access to several interactive widgets:
- Dashboard with analytics and metrics
- Enhanced example with OpenAI integration features
- [lists all your available widgets...]
```

## 📱 **Mobile and Desktop Support**

Your widgets will work across:

- **ChatGPT Web** (desktop browsers)
- **ChatGPT Mobile App** (iOS/Android)
- **ChatGPT Desktop App** (Windows/Mac/Linux)

The responsive design automatically adapts to each platform using the `useDeviceCapabilities()` hook.

## 📈 **Production Considerations**

### Performance

- **Edge caching** via Cloudflare CDN
- **Content hashing** prevents cache issues
- **Lazy loading** of widget assets
- **Optimized bundles** with vendor chunking

### Security

- **CSP headers** prevent XSS attacks
- **Domain validation** ensures proper origins
- **Environment isolation** between dev/prod

### Monitoring

- **Cloudflare Analytics** for request metrics
- **Worker logs** via `wrangler tail`
- **Error tracking** with structured logging

### Scaling

- **Automatic scaling** with Cloudflare Workers
- **Global distribution** across 300+ edge locations
- **Durable Objects** for consistent state

## 🛠 **Troubleshooting**

### Common Issues

**"Widget manifest not found"**

```bash
# Ensure widgets are built first
pnpm -C packages/widgets build
```

**"WORKER_DOMAIN_BASE required"**

```bash
# Set in .env file
echo 'WORKER_DOMAIN_BASE="https://your-app.workers.dev"' >> .env
```

**"Deployment failed"**

```bash
# Check authentication
npx wrangler whoami

# Check configuration
pnpm check
```

### Development Tips

```bash
# Local development with Cloudflare environment
pnpm dev

# Validate before deployment
pnpm check

# View live logs
npx wrangler tail

# Check worker status
npx wrangler status
```

## 🎯 **Benefits for Library Users**

### For Widget Developers

- **Zero-config deployment** - just run `pnpm build-deploy`
- **Automatic discovery** - all widgets are included
- **Production-ready** - proper caching, CSP, error handling

### For End Users

- **Global performance** - served from Cloudflare edge
- **Reliable uptime** - Cloudflare's 99.99% SLA
- **Fast loading** - optimized assets and caching

### For Organizations

- **Cost-effective** - Cloudflare Workers free tier
- **Scalable** - handles traffic spikes automatically
- **Secure** - enterprise-grade security features

## 📚 **Next Steps**

1. **Deploy your first widget server** using this guide
2. **Customize tools** for your specific use cases  
3. **Monitor performance** via Cloudflare dashboard
4. **Scale up** by adding more widgets and tools

The Cloudflare Workers integration makes the ChatUI widget library production-ready with minimal configuration, providing a robust foundation for deploying interactive widgets at scale.
