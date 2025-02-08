import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { TrendingUp, BarChart3, AlertCircle, Shield, Clock, MapPin, ChevronRight } from "lucide-react";
import { Badge } from "@/components/ui/badge";

const FedBalanceSheetArticle: React.FC = () => {
  const scenarios = [
    {
      name: "Soft Landing",
      probability: "60%",
      triggers: "Inflation cools to 2.4%",
      equityImpact: "S&P +15%, Tech rallies",
      cryptoImpact: "BTC $100K, ETH $6K",
    },
    {
      name: "Early Pivot",
      probability: "25%",
      triggers: "Unemployment >4.5% by Q1'25",
      equityImpact: "Small-caps surge 30%",
      cryptoImpact: "Altcoins (SOL +50%)",
    },
    {
      name: "Stagflation",
      probability: "15%",
      triggers: "Oil spikes >$100/bbl",
      equityImpact: "Defensives outperform",
      cryptoImpact: "BTC tests $60K, stablecoins",
    },
  ];

  return (
    <div className="max-w-7xl mx-auto p-6 space-y-6">
      {/* Header Section */}
      <div className="space-y-4">
        <h1 className="text-3xl font-bold">The Fed's Balance Sheet Blueprint: Faster QT, Strategic Pivot</h1>
        <div className="flex items-center space-x-2">
          <Clock className="w-4 h-4" />
          <span>February 2025</span>
        </div>
      </div>

      {/* Main QT Analysis Card */}
      <Card className="border-l-4 border-l-blue-500">
        <CardContent className="p-6">
          <div className="flex items-start space-x-4">
            <TrendingUp className="w-6 h-6 text-blue-500" />
            <div>
              <h2 className="text-xl font-semibold mb-3">Key QT Developments</h2>
              <ul className="space-y-2">
                <li>• Balance sheet cut by $2T since 2022</li>
                <li>• Rapid $297B reduction since June 2024</li>
                <li>• Exceeds JPMorgan's $1.7T estimate</li>
              </ul>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Market Implications Grid */}
      <div className="grid md:grid-cols-2 gap-6">
        {/* Equities Card */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center space-x-2">
              <BarChart3 className="w-5 h-5" />
              <span>Equities Outlook</span>
            </CardTitle>
          </CardHeader>
          <CardContent>
            <ul className="space-y-3">
              <li className="flex items-start space-x-2">
                <ChevronRight className="w-4 h-4 mt-1 text-green-500" />
                <span>S&P 500 potential to reach 6,000+ by Q3 2025</span>
              </li>
              <li className="flex items-start space-x-2">
                <ChevronRight className="w-4 h-4 mt-1 text-green-500" />
                <span>Tech/Growth sectors favored by stable reserves</span>
              </li>
              <li className="flex items-start space-x-2">
                <ChevronRight className="w-4 h-4 mt-1 text-green-500" />
                <span>AI infrastructure and renewables outperformance expected</span>
              </li>
            </ul>
          </CardContent>
        </Card>

        {/* Crypto Card */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center space-x-2">
              <Shield className="w-5 h-5" />
              <span>Crypto Projections</span>
            </CardTitle>
          </CardHeader>
          <CardContent>
            <ul className="space-y-3">
              <li className="flex items-start space-x-2">
                <ChevronRight className="w-4 h-4 mt-1 text-blue-500" />
                <span>Bitcoin targeting $120K by late 2025</span>
              </li>
              <li className="flex items-start space-x-2">
                <ChevronRight className="w-4 h-4 mt-1 text-blue-500" />
                <span>ETH/BTC ratio rebound expected</span>
              </li>
              <li className="flex items-start space-x-2">
                <ChevronRight className="w-4 h-4 mt-1 text-blue-500" />
                <span>High-beta tokens (SOL, DOGE) poised for surge</span>
              </li>
            </ul>
          </CardContent>
        </Card>
      </div>

      {/* Scenarios Section */}
      <Card>
        <CardHeader>
          <CardTitle>Market Scenarios</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {scenarios.map((scenario) => (
              <div key={scenario.name} className="p-4 border rounded-lg">
                <div className="flex justify-between items-center mb-2">
                  <h3 className="font-semibold">{scenario.name}</h3>
                  <Badge variant={
                    scenario.probability === "60%" ? "default" :
                    scenario.probability === "25%" ? "secondary" : "destructive"
                  }>
                    {scenario.probability}
                  </Badge>
                </div>
                <div className="grid md:grid-cols-3 gap-4 text-sm">
                  <div>
                    <p className="text-muted-foreground">Trigger:</p>
                    <p>{scenario.triggers}</p>
                  </div>
                  <div>
                    <p className="text-muted-foreground">Equity Impact:</p>
                    <p>{scenario.equityImpact}</p>
                  </div>
                  <div>
                    <p className="text-muted-foreground">Crypto Impact:</p>
                    <p>{scenario.cryptoImpact}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Risks to Monitor */}
      <Card className="border-l-4 border-l-red-500">
        <CardHeader>
          <CardTitle className="flex items-center space-x-2">
            <AlertCircle className="w-5 h-5" />
            <span>Risks to Monitor</span>
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-3">
            <div className="flex items-start space-x-3">
              <MapPin className="w-4 h-4 mt-1 text-red-500" />
              <div>
                <p className="font-medium">Geopolitical Shock</p>
                <p className="text-sm text-muted-foreground">Middle East conflict or Taiwan escalation could spike oil prices</p>
              </div>
            </div>
            <div className="flex items-start space-x-3">
              <AlertCircle className="w-4 h-4 mt-1 text-red-500" />
              <div>
                <p className="font-medium">Inflation Stickiness</p>
                <p className="text-sm text-muted-foreground">Core services at 3.5% YoY; hot CPI print &gt;3% would reset rate cut expectations</p>
              </div>
            </div>
            <div className="flex items-start space-x-3">
              <Shield className="w-4 h-4 mt-1 text-red-500" />
              <div>
                <p className="font-medium">Crypto Regulation</p>
                <p className="text-sm text-muted-foreground">SEC Chair Gensler's continued DeFi skepticism poses sector risks</p>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Bottom Line */}
      <Card className="bg-gradient-to-r from-blue-50 to-blue-100 dark:from-blue-900/20 dark:to-blue-800/20">
        <CardHeader>
          <CardTitle>The Bottom Line</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            <p className="text-lg">The Fed's QT exit marks a structural shift from austerity to equilibrium—bullish for risk assets but requiring nimble positioning.</p>
            <div className="grid md:grid-cols-2 gap-4">
              <div>
                <h4 className="font-semibold mb-2">Overweight</h4>
                <ul className="list-disc list-inside text-sm space-y-1">
                  <li>Tech (NVDA, META)</li>
                  <li>Bitcoin miners (RIOT)</li>
                  <li>AI infrastructure plays</li>
                </ul>
              </div>
              <div>
                <h4 className="font-semibold mb-2">Avoid</h4>
                <ul className="list-disc list-inside text-sm space-y-1">
                  <li>Regional banks</li>
                  <li>Commercial REITs facing refinancing</li>
                </ul>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default FedBalanceSheetArticle;