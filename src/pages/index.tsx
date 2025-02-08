import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Search, Box, Tag, Loader2 } from "lucide-react"

// Temporary mock data until database is connected
const mockComponents = [
  { id: 1, name: "ATMega328P", drawer: "A1", quantity: 15, tags: ["MCU", "IC", "Digital"] },
  { id: 2, name: "10k Resistor", drawer: "B3", quantity: 100, tags: ["Resistor", "Passive"] },
  { id: 3, name: "100uF Capacitor", drawer: "C2", quantity: 50, tags: ["Capacitor", "Passive"] },
]

const mockDrawers = [
  { id: "A1", status: "available", components: 5 },
  { id: "B3", status: "in-use", components: 8 },
  { id: "C2", status: "available", components: 3 },
]

export default function IndexPage() {
  return (
    <div className="container mx-auto p-6 space-y-6">
      {/* Header with Search */}
      <div className="flex justify-between items-center">
        <h1 className="text-2xl font-bold">Elektrische Componenten Inventaris</h1>
        <div className="flex gap-4">
          <div className="relative w-64">
            <Search className="absolute left-2 top-2.5 h-4 w-4 text-muted-foreground" />
            <Input placeholder="Zoek componenten..." className="pl-8" />
          </div>
          <Button>
            <Tag className="mr-2 h-4 w-4" />
            Tags beheren
          </Button>
        </div>
      </div>

      {/* Main Content */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        {/* Drawer Status Section */}
        <Card className="md:col-span-1">
          <CardHeader>
            <CardTitle className="text-lg flex items-center gap-2">
              <Box className="h-5 w-5" />
              Laden Status
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {mockDrawers.map((drawer) => (
                <div key={drawer.id} className="flex items-center justify-between p-2 border rounded-lg">
                  <div>
                    <span className="font-medium">Lade {drawer.id}</span>
                    <Badge variant={drawer.status === 'available' ? 'success' : 'secondary'} className="ml-2">
                      {drawer.status === 'available' ? 'Beschikbaar' : 'In gebruik'}
                    </Badge>
                  </div>
                  <Button variant="outline" size="sm">
                    Ophalen
                  </Button>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Components Overview Section */}
        <div className="md:col-span-3">
          <Tabs defaultValue="all" className="space-y-4">
            <TabsList>
              <TabsTrigger value="all">Alle Componenten</TabsTrigger>
              <TabsTrigger value="low">Lage Voorraad</TabsTrigger>
              <TabsTrigger value="recent">Recent Gebruikt</TabsTrigger>
            </TabsList>
            
            <TabsContent value="all" className="space-y-4">
              <Card>
                <CardContent className="p-0">
                  <Table>
                    <TableHeader>
                      <TableRow>
                        <TableHead>Component</TableHead>
                        <TableHead>Lade</TableHead>
                        <TableHead>Voorraad</TableHead>
                        <TableHead>Tags</TableHead>
                        <TableHead className="text-right">Acties</TableHead>
                      </TableRow>
                    </TableHeader>
                    <TableBody>
                      {mockComponents.map((component) => (
                        <TableRow key={component.id}>
                          <TableCell className="font-medium">{component.name}</TableCell>
                          <TableCell>{component.drawer}</TableCell>
                          <TableCell>{component.quantity}</TableCell>
                          <TableCell>
                            <div className="flex gap-1">
                              {component.tags.map((tag, idx) => (
                                <Badge key={idx} variant="secondary">{tag}</Badge>
                              ))}
                            </div>
                          </TableCell>
                          <TableCell className="text-right">
                            <Button variant="outline" size="sm">Details</Button>
                          </TableCell>
                        </TableRow>
                      ))}
                    </TableBody>
                  </Table>
                </CardContent>
              </Card>
            </TabsContent>
          </Tabs>
        </div>
      </div>
    </div>
  )
}