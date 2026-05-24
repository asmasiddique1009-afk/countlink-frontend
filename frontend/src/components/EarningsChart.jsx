import { useDashboardStore } from '@/stores/dashboardStore';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Tabs, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Area, AreaChart } from 'recharts';

const weeklyData = [
{ name: 'Mon', earnings: 2400, orders: 24 },
{ name: 'Tue', earnings: 1398, orders: 18 },
{ name: 'Wed', earnings: 9800, orders: 45 },
{ name: 'Thu', earnings: 3908, orders: 32 },
{ name: 'Fri', earnings: 4800, orders: 38 },
{ name: 'Sat', earnings: 3800, orders: 28 },
{ name: 'Sun', earnings: 4300, orders: 35 }];


const monthlyData = [
{ name: 'Week 1', earnings: 12400, orders: 124 },
{ name: 'Week 2', earnings: 15398, orders: 158 },
{ name: 'Week 3', earnings: 19800, orders: 195 },
{ name: 'Week 4', earnings: 23908, orders: 232 }];


export function EarningsChart() {
  const { chartPeriod, setChartPeriod } = useDashboardStore();
  const data = chartPeriod === 'weekly' ? weeklyData : monthlyData;

  return (
    <Card className="bg-card border-border">
      <CardHeader>
        <div className="flex items-center justify-between">
          <CardTitle className="text-foreground">Earnings Overview</CardTitle>
          <Tabs value={chartPeriod} onValueChange={(value) => setChartPeriod(value)}>
            <TabsList className="bg-muted">
              <TabsTrigger value="weekly" className="text-foreground data-[state=active]:bg-background data-[state=active]:text-foreground">
                Weekly
              </TabsTrigger>
              <TabsTrigger value="monthly" className="text-foreground data-[state=active]:bg-background data-[state=active]:text-foreground">
                Monthly
              </TabsTrigger>
            </TabsList>
          </Tabs>
        </div>
      </CardHeader>
      <CardContent>
        <div className="h-[400px] w-full">
          <ResponsiveContainer width="100%" height="100%">
            <AreaChart data={data}>
              <defs>
                <linearGradient id="colorEarnings" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%" stopColor="hsl(245, 75%, 60%)" stopOpacity={0.3} />
                  <stop offset="95%" stopColor="hsl(245, 75%, 60%)" stopOpacity={0} />
                </linearGradient>
              </defs>
              <CartesianGrid strokeDasharray="3 3" stroke="hsl(var(--border))" opacity={0.3} />
              <XAxis
                dataKey="name"
                stroke="hsl(var(--muted-foreground))"
                tick={{ fill: 'hsl(var(--muted-foreground))' }} />
              
              <YAxis
                stroke="hsl(var(--muted-foreground))"
                tick={{ fill: 'hsl(var(--muted-foreground))' }} />
              
              <Tooltip
                contentStyle={{
                  backgroundColor: 'hsl(var(--popover))',
                  border: '1px solid hsl(var(--border))',
                  borderRadius: '8px',
                  color: 'hsl(var(--popover-foreground))'
                }} />
              
              <Area
                type="monotone"
                dataKey="earnings"
                stroke="hsl(245, 75%, 60%)"
                strokeWidth={2}
                fill="url(#colorEarnings)"
                animationDuration={1000} />
              
            </AreaChart>
          </ResponsiveContainer>
        </div>
      </CardContent>
    </Card>);

}