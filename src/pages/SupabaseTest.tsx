import { useState } from 'react';
import { supabase } from '@/lib/supabase';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { CheckCircle2, XCircle, AlertCircle } from 'lucide-react';

const SupabaseTest = () => {
  const [results, setResults] = useState<any>({});
  const [testing, setTesting] = useState(false);

  const runTests = async () => {
    setTesting(true);
    const testResults: any = {};

    // Test 1: Check environment variables
    testResults.envVars = {
      url: !!import.meta.env.VITE_SUPABASE_URL,
      key: !!import.meta.env.VITE_SUPABASE_ANON_KEY,
      urlValue: import.meta.env.VITE_SUPABASE_URL,
    };

    // Test 2: Check connection
    try {
      const { data, error } = await supabase.from('users').select('count').limit(0);
      testResults.usersTable = { exists: !error, error: error?.message };
    } catch (e: any) {
      testResults.usersTable = { exists: false, error: e.message };
    }

    // Test 3: Check products table
    try {
      const { data, error } = await supabase.from('products').select('count').limit(0);
      testResults.productsTable = { exists: !error, error: error?.message };
    } catch (e: any) {
      testResults.productsTable = { exists: false, error: e.message };
    }

    // Test 4: Check orders table
    try {
      const { data, error } = await supabase.from('orders').select('count').limit(0);
      testResults.ordersTable = { exists: !error, error: error?.message };
    } catch (e: any) {
      testResults.ordersTable = { exists: false, error: e.message };
    }

    // Test 5: Check cart table
    try {
      const { data, error } = await supabase.from('cart').select('count').limit(0);
      testResults.cartTable = { exists: !error, error: error?.message };
    } catch (e: any) {
      testResults.cartTable = { exists: false, error: e.message };
    }

    setResults(testResults);
    setTesting(false);
  };

  const StatusIcon = ({ status }: { status: boolean }) => {
    return status ? (
      <CheckCircle2 className="h-5 w-5 text-green-500" />
    ) : (
      <XCircle className="h-5 w-5 text-red-500" />
    );
  };

  return (
    <div className="min-h-screen bg-background p-8">
      <div className="max-w-4xl mx-auto">
        <Card className="glass-card">
          <CardHeader>
            <CardTitle className="text-2xl">Supabase Connection Test</CardTitle>
            <p className="text-sm text-muted-foreground">
              Run this test to verify your Supabase database setup
            </p>
          </CardHeader>
          <CardContent className="space-y-6">
            <Button onClick={runTests} disabled={testing} className="w-full">
              {testing ? 'Testing...' : 'Run Tests'}
            </Button>

            {Object.keys(results).length > 0 && (
              <div className="space-y-4">
                {/* Environment Variables */}
                <div className="p-4 rounded-lg border border-border">
                  <div className="flex items-center gap-3 mb-2">
                    <StatusIcon status={results.envVars?.url && results.envVars?.key} />
                    <h3 className="font-semibold">Environment Variables</h3>
                  </div>
                  <div className="ml-8 space-y-1 text-sm">
                    <p className="flex items-center gap-2">
                      <StatusIcon status={results.envVars?.url} />
                      VITE_SUPABASE_URL: {results.envVars?.url ? '✓ Set' : '✗ Missing'}
                    </p>
                    <p className="flex items-center gap-2">
                      <StatusIcon status={results.envVars?.key} />
                      VITE_SUPABASE_ANON_KEY: {results.envVars?.key ? '✓ Set' : '✗ Missing'}
                    </p>
                    {results.envVars?.urlValue && (
                      <p className="text-muted-foreground text-xs mt-2">
                        URL: {results.envVars.urlValue}
                      </p>
                    )}
                  </div>
                </div>

                {/* Users Table */}
                <div className="p-4 rounded-lg border border-border">
                  <div className="flex items-center gap-3 mb-2">
                    <StatusIcon status={results.usersTable?.exists} />
                    <h3 className="font-semibold">Users Table</h3>
                  </div>
                  {results.usersTable?.error && (
                    <p className="ml-8 text-xs text-red-500">{results.usersTable.error}</p>
                  )}
                </div>

                {/* Products Table */}
                <div className="p-4 rounded-lg border border-border">
                  <div className="flex items-center gap-3 mb-2">
                    <StatusIcon status={results.productsTable?.exists} />
                    <h3 className="font-semibold">Products Table</h3>
                  </div>
                  {results.productsTable?.error && (
                    <p className="ml-8 text-xs text-red-500">{results.productsTable.error}</p>
                  )}
                </div>

                {/* Orders Table */}
                <div className="p-4 rounded-lg border border-border">
                  <div className="flex items-center gap-3 mb-2">
                    <StatusIcon status={results.ordersTable?.exists} />
                    <h3 className="font-semibold">Orders Table</h3>
                  </div>
                  {results.ordersTable?.error && (
                    <p className="ml-8 text-xs text-red-500">{results.ordersTable.error}</p>
                  )}
                </div>

                {/* Cart Table */}
                <div className="p-4 rounded-lg border border-border">
                  <div className="flex items-center gap-3 mb-2">
                    <StatusIcon status={results.cartTable?.exists} />
                    <h3 className="font-semibold">Cart Table</h3>
                  </div>
                  {results.cartTable?.error && (
                    <p className="ml-8 text-xs text-red-500">{results.cartTable.error}</p>
                  )}
                </div>

                {/* Instructions */}
                {(!results.usersTable?.exists || !results.productsTable?.exists) && (
                  <div className="p-4 rounded-lg bg-yellow-500/10 border border-yellow-500/20">
                    <div className="flex items-start gap-3">
                      <AlertCircle className="h-5 w-5 text-yellow-500 mt-0.5" />
                      <div className="space-y-2">
                        <h3 className="font-semibold text-yellow-500">Tables Not Found</h3>
                        <p className="text-sm text-muted-foreground">
                          You need to run the SQL schema in Supabase. Follow these steps:
                        </p>
                        <ol className="text-sm text-muted-foreground list-decimal list-inside space-y-1 ml-2">
                          <li>Go to your Supabase Dashboard</li>
                          <li>Click "SQL Editor" in the sidebar</li>
                          <li>Click "New Query"</li>
                          <li>Copy all contents from <code className="text-xs bg-muted px-1 rounded">supabase-schema.sql</code></li>
                          <li>Paste and click "Run"</li>
                        </ol>
                        <p className="text-xs text-muted-foreground mt-2">
                          See <code className="bg-muted px-1 rounded">SUPABASE_SETUP.md</code> for detailed instructions.
                        </p>
                      </div>
                    </div>
                  </div>
                )}

                {results.usersTable?.exists && 
                 results.productsTable?.exists && 
                 results.ordersTable?.exists && 
                 results.cartTable?.exists && (
                  <div className="p-4 rounded-lg bg-green-500/10 border border-green-500/20">
                    <div className="flex items-center gap-3">
                      <CheckCircle2 className="h-5 w-5 text-green-500" />
                      <div>
                        <h3 className="font-semibold text-green-500">All Tests Passed!</h3>
                        <p className="text-sm text-muted-foreground">
                          Your Supabase database is properly configured.
                        </p>
                      </div>
                    </div>
                  </div>
                )}
              </div>
            )}
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default SupabaseTest;
