import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card"
import { 
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { 
  Search, 
  Box, 
  Tag, 
  MoreVertical, 
  Plus,
  FileDown,
  FileUp,
  RefreshCcw,
  Settings,
  Boxes,
  Tags,
  MoveUpRight
} from "lucide-react"
import { useNavigate } from "react-router-dom"

// Mock data for the dashboard
const stats = {
  totalDrawers: 24,
  activeDrawers: 8,
  totalComponents: 156,
  totalTags: 45,
  lowStock: 12,
  movements: [
    { date: '2024-01', count: 45 },
    { date: '2024-02', count: 52 },
    { date: '2024-03', count: 38 },
    { date: '2024-04', count: 65 },
    { date: '2024-05', count: 48 },
    { date: '2024-06', count: 58 }
  ]
}

export default function IndexPage() {
  const navigate = useNavigate()

  return (
    <div className="container mx-auto p-6 space-y-6">
      {/* Header with Actions */}
      <div className="flex justify-between items-center">
        <h1 className="text-2xl font-bold">Dashboard</h1>
        <div className="flex gap-4">
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button>
                <Plus className="mr-2 h-4 w-4" />
                Acties
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end" className="w-48">
              <DropdownMenuItem onClick={() => navigate('/components')}>
                <Plus className="mr-2 h-4 w-4" />
                Nieuw Component
              </DropdownMenuItem>
              <DropdownMenuItem onClick={() => navigate('/tags')}>
                <Tag className="mr-2 h-4 w-4" />
                Nieuwe Tag
              </DropdownMenuItem>
              <DropdownMenuItem>
                <FileDown className="mr-2 h-4 w-4" />
                Importeer Data
              </DropdownMenuItem>
              <DropdownMenuItem>
                <FileUp className="mr-2 h-4 w-4" />
                Exporteer Data
              </DropdownMenuItem>
              <DropdownMenuItem>
                <Settings className="mr-2 h-4 w-4" />
                Instellingen
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
          <Button variant="outline">
            <RefreshCcw className="mr-2 h-4 w-4" />
            Ververs
          </Button>
        </div>
      </div>

      {/* Stats Grid */}
      <div className="grid gap-6 grid-cols-1 sm:grid-cols-2 lg:grid-cols-4">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Totaal Laden</CardTitle>
            <Boxes className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{stats.totalDrawers}</div>
            <p className="text-xs text-muted-foreground">
              {stats.activeDrawers} actief
            </p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Componenten</CardTitle>
            <Box className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{stats.totalComponents}</div>
            <p className="text-xs text-muted-foreground">
              {stats.lowStock} lage voorraad
            </p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Tags</CardTitle>
            <Tags className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{stats.totalTags}</div>
            <p className="text-xs text-muted-foreground">
              Voor categorisatie
            </p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Bewegingen</CardTitle>
            <MoveUpRight className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{stats.movements[stats.movements.length - 1].count}</div>
            <p className="text-xs text-muted-foreground">
              Deze maand
            </p>
          </CardContent>
        </Card>
      </div>

      {/* Movement Chart */}
      <Card>
        <CardHeader>
          <CardTitle>Bewegingen Overzicht</CardTitle>
          <CardDescription>Aantal lade bewegingen per maand</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="h-[200px] w-full">
            {/* Chart visualization */}
            <div className="flex items-end justify-between h-full pt-4">
              {stats.movements.map((month, index) => (
                <div key={month.date} className="flex flex-col items-center">
                  <div 
                    className="bg-primary/10 hover:bg-primary/20 rounded-t w-12 transition-all"
                    style={{ height: `${(month.count / 70) * 100}%` }}
                  >
                    <div 
                      className="bg-primary w-full rounded-t transition-all" 
                      style={{ height: '3px' }}
                    />
                  </div>
                  <span className="text-xs text-muted-foreground mt-2">
                    {month.date.split('-')[1]}
                  </span>
                </div>
              ))}
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Recent Activity & Quick Actions */}
      <div className="grid gap-6 grid-cols-1 lg:grid-cols-2">
        <Card>
          <CardHeader>
            <CardTitle>Recente Activiteit</CardTitle>
            <CardDescription>Laatste bewegingen en updates</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {[1,2,3].map((_, i) => (
                <div key={i} className="flex items-center gap-4 p-2 border rounded">
                  <div className="h-8 w-8 rounded-full bg-primary/10 flex items-center justify-center">
                    <Box className="h-4 w-4" />
                  </div>
                  <div className="flex-1">
                    <p className="text-sm font-medium">Lade A{i+1} geopend</p>
                    <p className="text-xs text-muted-foreground">2 minuten geleden</p>
                  </div>
                  <Button variant="ghost" size="icon">
                    <MoreVertical className="h-4 w-4" />
                  </Button>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Snelle Acties</CardTitle>
            <CardDescription>Veel gebruikte functies</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-2 gap-4">
              <Button variant="outline" className="h-20 flex flex-col gap-2">
                <Box className="h-6 w-6" />
                Open Lade
              </Button>
              <Button 
                variant="outline" 
                className="h-20 flex flex-col gap-2"
                onClick={() => navigate('/components')}
              >
                <Plus className="h-6 w-6" />
                Nieuw Component
              </Button>
              <Button 
                variant="outline" 
                className="h-20 flex flex-col gap-2"
                onClick={() => navigate('/tags')}
              >
                <Tag className="h-6 w-6" />
                Beheer Tags
              </Button>
              <Button variant="outline" className="h-20 flex flex-col gap-2">
                <FileDown className="h-6 w-6" />
                Export Data
              </Button>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}