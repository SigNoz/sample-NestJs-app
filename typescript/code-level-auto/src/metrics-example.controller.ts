import { Controller, Post, Get, Body } from '@nestjs/common';
import { 
  userSignupCounter, 
  orderCreatedCounter, 
  orderValueHistogram, 
  paymentProcessingDuration,
  activeUsersCounter,
  inventoryItemsCounter 
} from './otel';

@Controller('example')
export class MetricsExampleController {
  
  @Post('signup')
  async userSignup(@Body() signupData: any) {
    // Increment user signup counter
    userSignupCounter.add(1, { 
      plan: signupData.plan || 'free',
      source: signupData.source || 'organic' 
    });
    
    // Increment active users
    activeUsersCounter.add(1);
    
    return { message: 'User signup recorded' };
  }

  @Post('order')
  async createOrder(@Body() orderData: any) {
    const startTime = Date.now();
    
    // Increment order counter with attributes
    orderCreatedCounter.add(1, { 
      product_category: orderData.category || 'general',
      payment_method: orderData.paymentMethod || 'card' 
    });
    
    // Record order value distribution
    orderValueHistogram.record(orderData.totalAmount || 0, {
      currency: orderData.currency || 'USD',
      region: orderData.region || 'us-east'
    });
    
    // Simulate payment processing
    await new Promise(resolve => setTimeout(resolve, Math.random() * 200));
    
    // Record payment processing duration
    const duration = Date.now() - startTime;
    paymentProcessingDuration.record(duration, {
      payment_provider: orderData.paymentProvider || 'stripe',
      success: 'true'
    });
    
    return { message: 'Order created', processingTime: duration };
  }

  @Post('inventory/add')
  async addInventory(@Body() data: any) {
    const quantity = data.quantity || 1;
    
    // Increase inventory counter
    inventoryItemsCounter.add(quantity, {
      warehouse: data.warehouse || 'main',
      product_id: data.productId
    });
    
    return { message: `Added ${quantity} items to inventory` };
  }

  @Post('inventory/remove')
  async removeInventory(@Body() data: any) {
    const quantity = data.quantity || 1;
    
    // Decrease inventory counter
    inventoryItemsCounter.add(-quantity, {
      warehouse: data.warehouse || 'main',
      product_id: data.productId,
      reason: data.reason || 'sold'
    });
    
    return { message: `Removed ${quantity} items from inventory` };
  }

  @Post('user/logout')
  async userLogout(@Body() data: any) {
    // Decrement active users
    activeUsersCounter.add(-1);
    
    return { message: 'User logged out' };
  }
}