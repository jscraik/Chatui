# ChatGPT Integration Guide

## 🎯 **Deploy ChatUI Widgets to ChatGPT Following OpenAI's Official Process**

This guide follows OpenAI's official deployment documentation to get your ChatUI widgets working in ChatGPT as an MCP connector.

## ⚡ **Quick Setup**

### Step 1: Deploy to Cloudflare Workers

```bash
# Navigate to the deployment template
cd packages/cloudflare-template

# Install dependencies
pnpm install

# Set your domain (replace with your actual domain)
echo 'WORKER_DOMAIN_BASE="https://my-widgets.example.workers.dev"' > .env

# Deploy to Cloudflare Workers
pnpm build-deploy
```

### Step 2: Enable Developer Mode in ChatGPT

Following OpenAI's official process:

1. **Navigate to ChatGPT Settings**:
   - Go to **Settings → Apps & Connectors → Advanced settings** (bottom of page)
   - **Toggle Developer Mode** (if your organization allows it)
   - You should now see a **Create** button under **Settings → Apps & Connectors**

**Note**: As of November 13th, 2025, ChatGPT Apps are supported on all plans, including Business, Enterprise, and Education plans.

### Step 3: Create Your MCP Connector

1. **Ensure your MCP server is reachable over HTTPS**:
   - Your deployment URL: `https://my-widgets.example.workers.dev/mcp`
   - For local development, use ngrok: `ngrok http 8787`

2. **In ChatGPT, navigate to Settings → Connectors → Create**

3. **Provide the metadata for your connector**:
   - **Connector name**: `ChatUI Widgets` (user-facing title)
   - **Description**: `Interactive widgets powered by ChatUI library with dashboard, tables, and enhanced UI components for data visualization and user interaction`
   - **Connector URL**: `https://my-widgets.example.workers.dev/mcp`

4. **Click Create**: If the connection succeeds, you'll see a list of tools your server advertises

### Step 4: Test Your Integration

1. **Open a new chat** in ChatGPT
2. **Click the + button** near the message composer, and click **More**
3. **Choose your connector** in the list of available tools
4. **Test with these prompts**:

```text
"Show me the dashboard"
"Display the enhanced example widget"
"What widgets do you have available?"
"Create a data table with sample information"
```

You should see interactive widgets appear! 🎉

## 📱 **Platform Support**

Your widgets work on:

- ✅ **ChatGPT Web** (Chrome, Firefox, Safari, Edge)
- ✅ **ChatGPT Mobile** (iOS and Android apps)
- ✅ **ChatGPT Desktop** (Windows, Mac, Linux apps)

## 🔧 **Troubleshooting**

### "MCP server not responding"

```bash
# Test your deployment
curl https://my-widgets.example.workers.dev/mcp

# Should return JSON with server info
```

### "Widgets not loading"

- Check browser console for errors
- Verify your domain is set correctly in `.env`
- Try refreshing ChatGPT

### "Tools not available"

```bash
# Check Cloudflare Workers logs
npx wrangler tail

# Look for any error messages
```

## 🔄 **Refreshing Metadata**

When you update your widgets or tools:

1. **Update your MCP server** and redeploy: `pnpm build-deploy`
2. **In Settings → Connectors**, click into your connector and choose **Refresh**
3. **Verify the tool list updates** and test with new prompts

## 🧪 **Testing with Other Clients**

### API Playground

For raw request/response logs:

1. **Open API Playground**: Visit [platform.openai.com/playground](https://platform.openai.com/playground)
2. **Add MCP Server**: Choose **Tools → Add → MCP Server**
3. **Enter URL**: `https://my-widgets.example.workers.dev/mcp`
4. **Test directly**: Issue prompts and inspect JSON request/response pairs

### Local Development with ngrok

For local testing during development:

```bash
# In one terminal: start your local server
cd packages/cloudflare-template
pnpm dev

# In another terminal: expose via ngrok
ngrok http 8787

# Use the ngrok URL in ChatGPT: https://abc123.ngrok.app/mcp
```

Keep the tunnel running while you iterate. When you change code:

1. Rebuild the component bundle (`pnpm build`)
2. Restart your MCP server
3. Refresh the connector in ChatGPT settings to pull the latest metadata

## 🎨 **What You Get**

After integration, ChatGPT will have access to:

- **📊 Dashboard Widget** - Interactive analytics and metrics
- **🧪 Enhanced Example** - Demonstrates all widget features
- **🛒 Shopping Cart** - E-commerce functionality
- **📝 Data Tables** - Structured data display
- **🎠 Carousels & Galleries** - Media presentation
- **And more...** - All 14+ widgets from the library

## 🚀 **Next Steps**

1. **Customize tools** - Edit `src/worker/index.ts` to add your own tools
2. **Add more widgets** - Create new widgets in the library
3. **Share with team** - Give them your MCP URL to add to their ChatGPT
4. **Monitor usage** - Check Cloudflare Analytics for usage stats

## 💡 **Pro Tips**

- **Use descriptive names** when adding to ChatGPT (e.g., "Company Widgets" instead of "MCP Server")
- **Test locally first** with `pnpm dev` before deploying
- **Check logs** with `npx wrangler tail` if something breaks
- **Update regularly** by running `pnpm build-deploy` after changes

## 🔗 **Example Interactions**

Once set up, you can have conversations like:

```
👤 User: "Can you show me a dashboard with some sample data?"
🤖 ChatGPT: I'll display an interactive dashboard for you.
[Interactive dashboard widget appears with charts and metrics]

👤 User: "What about an example of the enhanced widget features?"
🤖 ChatGPT: Here's the enhanced example widget that demonstrates all the advanced features.
[Enhanced widget appears showing theme detection, device info, etc.]

👤 User: "Show me a data table with some information"
🤖 ChatGPT: I'll create a data table widget for you.
[Interactive table widget appears with sortable columns]
```

## 📚 **Learn More**

- [Full Deployment Guide](./CLOUDFLARE_DEPLOYMENT_GUIDE.md) - Complete setup instructions
- [Widget Development](./packages/widgets/README.md) - How to create custom widgets
- [Cloudflare Workers Docs](https://developers.cloudflare.com/workers/) - Platform documentation
- [MCP Specification](https://modelcontextprotocol.io/) - Protocol details

---

**That's it!** You now have interactive widgets running in ChatGPT. The entire process takes about 5 minutes and gives you a production-ready deployment on Cloudflare's global edge network.
