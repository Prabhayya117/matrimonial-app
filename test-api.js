#!/usr/bin/env node

// Simple test script to verify all API endpoints

const http = require('http');

function makeRequest(method, path, body = null) {
  return new Promise((resolve, reject) => {
    const options = {
      hostname: 'localhost',
      port: 5000,
      path: path,
      method: method,
      headers: {
        'Content-Type': 'application/json'
      }
    };

    const req = http.request(options, (res) => {
      let data = '';
      res.on('data', (chunk) => { data += chunk; });
      res.on('end', () => {
        resolve({ status: res.statusCode, data: data });
      });
    });

    req.on('error', reject);
    if (body) req.write(JSON.stringify(body));
    req.end();
  });
}

async function runTests() {
  console.log('🧪 Testing Matrimonial API...\n');

  try {
    // Test 1: Register
    console.log('1️⃣ Testing Registration...');
    const registerRes = await makeRequest('POST', '/api/auth/register', {
      name: 'Test User',
      email: 'testuser@example.com',
      password: 'password123'
    });
    console.log(`   Status: ${registerRes.status}`);
    if (registerRes.status === 200 || registerRes.status === 201) {
      console.log('   ✅ Registration working\n');
    } else {
      console.log('   ⚠️ Registration may have issues\n');
    }

    // Test 2: Login
    console.log('2️⃣ Testing Login...');
    const loginRes = await makeRequest('POST', '/api/auth/login', {
      email: 'testuser@example.com',
      password: 'password123'
    });
    console.log(`   Status: ${loginRes.status}`);
    if (loginRes.status === 200) {
      console.log('   ✅ Login working\n');
      const loginData = JSON.parse(loginRes.data);
      const token = loginData.token;

      // Test 3: Get Profile with token
      console.log('3️⃣ Testing Get Profile...');
      const profileOptions = {
        hostname: 'localhost',
        port: 5000,
        path: '/api/users/profile',
        method: 'GET',
        headers: {
          'Authorization': `Bearer ${token}`
        }
      };

      const profileRes = await new Promise((resolve) => {
        const req = http.request(profileOptions, (res) => {
          let data = '';
          res.on('data', (chunk) => { data += chunk; });
          res.on('end', () => {
            resolve({ status: res.statusCode, data: data });
          });
        });
        req.end();
      });

      console.log(`   Status: ${profileRes.status}`);
      if (profileRes.status === 200) {
        console.log('   ✅ Profile endpoint working\n');
      }
    } else {
      console.log('   ⚠️ Login failed\n');
    }

    console.log('✨ Basic API tests completed!');

  } catch (err) {
    console.error('Error during testing:', err.message);
  }
}

runTests();
