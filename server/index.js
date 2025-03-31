import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import { TwitterApi } from 'twitter-api-v2';

dotenv.config();

const app = express();
const port = 5173;

app.use(cors());
app.use(express.json());

// Initialize Twitter client with app-only authentication
const twitterClient = new TwitterApi({
  appKey: process.env.TWITTER_API_KEY,
  appSecret: process.env.TWITTER_API_SECRET,
}).readOnly;

// Root route
app.get('/', (req, res) => {
  res.json({ status: 'Server is running' });
});

// Health check route
app.get('/health', (req, res) => {
  res.json({ status: 'healthy' });
});

// Twitter profile analysis endpoint
app.get('/api/twitter/analyze/:username', async (req, res) => {
  try {
    const { username } = req.params;
    
    console.log('Analyzing profile for username:', username);
    
    // Get bearer token and initialize client
    const appOnlyClient = await twitterClient.appLogin();
    
    const user = await appOnlyClient.v2.userByUsername(username, {
      'user.fields': ['public_metrics', 'protected'],
    });

    if (!user.data) {
      console.log('User not found');
      return res.status(404).json({ error: 'User not found' });
    }

    const profileData = {
      username: user.data.username,
      isProtected: user.data.protected,
      followersCount: user.data.public_metrics.followers_count,
      publicTweetsCount: user.data.public_metrics.tweet_count,
    };

    console.log('Profile data:', profileData);
    res.json(profileData);
  } catch (error) {
    console.error('Twitter API error:', error);
    res.status(500).json({ 
      error: 'Failed to analyze Twitter profile',
      details: error.message
    });
  }
});

// Error handling middleware
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).json({
    error: 'Internal Server Error',
    message: process.env.NODE_ENV === 'development' ? err.message : 'Something went wrong'
  });
});

// 404 handler
app.use((req, res) => {
  res.status(404).json({ error: 'Not Found' });
});

app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});