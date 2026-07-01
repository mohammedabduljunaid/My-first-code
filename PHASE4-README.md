# Phase 4: Monetization & Economy

## Overview
Advanced monetization system with coins, premium currency, battle passes, shops, and analytics.

## Tech Stack
- **Backend**: Node.js + PostgreSQL
- **Payment**: Stripe + RevenueCat
- **Analytics**: Mixpanel + Firebase
- **Database**: PostgreSQL + Redis
- **Admin**: Custom dashboard

## Economy System

### Currency

#### Soft Currency (Coins)
- Earned through gameplay
- Used for cosmetics
- Can be purchased for premium currency
- No spending limits

#### Premium Currency (Cash)
- Purchased with real money
- Used for exclusive items
- Battle pass unlock
- Limited supply creates value

### Earning Methods

#### Daily Rewards
```javascript
{
  day_1: 100_coins,
  day_3: 250_coins,
  day_7: 500_coins + 50_cash_bonus,
  day_30: 5000_coins + 500_cash_bonus
}
```

#### Gameplay Rewards
- Win: +50-200 coins (based on difficulty)
- Loss: +10-50 coins (participation)
- Best shot: +100 coins
- Win streak: +10 coins per win

#### Missions
- Daily missions: 100-500 coins
- Weekly missions: 500-2000 coins
- Monthly challenges: 5000 coins + rewards
- Special events: 10000 coins + exclusive items

#### Lucky Spin
- 1x daily free spin
- Can win coins (10-1000)
- Can win cosmetics
- Can win cash bonuses

### Shop System

#### Cosmetics (Coins + Cash)
- Cues (100-500 coins or 50 cash)
- Tables (200-1000 coins or 100 cash)
- Ball skins (50-300 coins or 25 cash)
- Avatars (75-250 coins or 40 cash)
- Emotes (50-100 coins or 25 cash)

#### Battle Pass (Premium)
- Monthly: $4.99 (500 cash equivalent)
- 50 tiers of rewards
- Free track + Premium track
- Cosmetics + coins + exclusive items

#### Starter Packs
- Beginner: $0.99 (200 coins + cue)
- Intermediate: $4.99 (1000 coins + 2 cues)
- Premium: $9.99 (5000 coins + 50 cash + exclusive cue)

## Project Structure

```
phase-4-monetization/
├── backend/
│   ├── src/
│   │   ├── economy/
│   │   │   ├── currency.ts
│   │   │   ├── shop.ts
│   │   │   ├── rewards.ts
│   │   │   ├── missions.ts
│   │   │   └── battlepass.ts
│   │   ├── payment/
│   │   │   ├── stripe.ts
│   │   │   ├── appstore.ts
│   │   │   └── playstore.ts
│   │   ├── analytics/
│   │   │   ├── events.ts
│   │   │   ├── funnels.ts
│   │   │   └── retention.ts
│   │   ├── admin/
│   │   │   ├── dashboard.ts
│   │   │   ├── balance.ts
│   │   │   └── fraud.ts
│   │   └── database/
│   │       ├── schema.sql
│   │       └── migrations/
│   └── package.json
├── frontend/
│   ├── admin-dashboard/
│   │   ├── src/
│   │   │   ├── components/
│   │   │   ├── pages/
│   │   │   └── services/
│   │   └── package.json
│   └── analytics-dashboard/
└── README.md
```

## Database Schema

### Users Table
```sql
CREATE TABLE users (
  id UUID PRIMARY KEY,
  username VARCHAR(255) UNIQUE,
  email VARCHAR(255) UNIQUE,
  soft_currency BIGINT DEFAULT 0,
  premium_currency INT DEFAULT 0,
  level INT DEFAULT 1,
  total_spent DECIMAL(10, 2) DEFAULT 0,
  created_at TIMESTAMP DEFAULT NOW(),
  updated_at TIMESTAMP DEFAULT NOW()
);
```

### Transactions Table
```sql
CREATE TABLE transactions (
  id UUID PRIMARY KEY,
  user_id UUID REFERENCES users(id),
  type ENUM('earn', 'spend'),
  currency_type ENUM('soft', 'premium'),
  amount INT,
  reason VARCHAR(255),
  transaction_id VARCHAR(255),
  created_at TIMESTAMP DEFAULT NOW()
);
```

### Shop Items Table
```sql
CREATE TABLE shop_items (
  id UUID PRIMARY KEY,
  name VARCHAR(255),
  item_type ENUM('cue', 'table', 'avatar', 'emote'),
  soft_currency_price INT,
  premium_currency_price INT,
  is_exclusive BOOLEAN DEFAULT FALSE,
  created_at TIMESTAMP DEFAULT NOW()
);
```

### Inventory Table
```sql
CREATE TABLE user_inventory (
  id UUID PRIMARY KEY,
  user_id UUID REFERENCES users(id),
  item_id UUID REFERENCES shop_items(id),
  equipped BOOLEAN DEFAULT FALSE,
  acquired_at TIMESTAMP DEFAULT NOW()
);
```

## API Endpoints

### Currency
- `GET /api/economy/balance` - Get current balance
- `POST /api/economy/add` - Add currency (admin)
- `POST /api/economy/spend` - Spend currency

### Shop
- `GET /api/shop/items` - List items
- `GET /api/shop/items/:id` - Get item details
- `POST /api/shop/purchase` - Purchase item
- `GET /api/inventory` - Get user inventory

### Battle Pass
- `GET /api/battlepass/current` - Get current season
- `POST /api/battlepass/unlock` - Unlock premium
- `GET /api/battlepass/progress` - Get progress

### Rewards
- `POST /api/rewards/daily` - Claim daily reward
- `POST /api/rewards/mission` - Complete mission
- `GET /api/rewards/missions` - List missions
- `POST /api/rewards/spin` - Lucky spin

### Payment
- `POST /api/payment/create-intent` - Create Stripe intent
- `POST /api/payment/verify` - Verify payment
- `POST /api/payment/receipt` - App Store receipt

## Analytics Events

### Revenue Events
```javascript
Mixpanel.track('purchase_complete', {
  product_id: 'cue_001',
  amount: 4.99,
  currency: 'USD',
  payment_method: 'stripe',
  user_level: 15
});
```

### Engagement Events
```javascript
Mixpanel.track('battle_pass_unlocked', {
  season: 1,
  cost: 499,
  currency_type: 'premium'
});
```

### Economy Events
```javascript
Mixpanel.track('currency_earned', {
  amount: 100,
  source: 'game_win',
  multiplier: 1.5
});
```

## Anti-Fraud Measures
- Transaction verification
- Duplicate purchase detection
- Unusual pattern detection
- Manual review queue
- Rate limiting

## Admin Dashboard

### Features
- User balance management
- Transaction history
- Revenue reports
- Fraud detection
- Item management
- Battle pass configuration
- Mission scheduling

## Payments

### Stripe (Web/Android)
```javascript
const paymentIntent = await stripe.paymentIntents.create({
  amount: 4990, // $49.90
  currency: 'usd',
  payment_method_types: ['card'],
  metadata: { user_id, product_id }
});
```

### RevenueCat (iOS/Android)
```swift
RevenueCat.shared.purchasePackage(package: starterPack) { transaction, customerInfo, error, cancelled in
  if let error = error {
    // Handle error
  } else if cancelled {
    // Handle cancelled
  } else {
    // Verify with backend
  }
}
```

## Monitoring
- Daily Active Users (DAU)
- Monthly Active Users (MAU)
- Average Revenue Per User (ARPU)
- Lifetime Value (LTV)
- Churn rate
- Retention curves

## Compliance
- GDPR compliance
- CCPA compliance
- App Store guidelines
- Play Store guidelines
- Tax reporting

## Next Steps
Phase 4 is ongoing. Continuously optimize:
- Monitor ARPU and adjust pricing
- A/B test cosmetics and prices
- Analyze player spending patterns
- Adjust economy based on data
- Add seasonal events and items
- Implement new monetization mechanics
