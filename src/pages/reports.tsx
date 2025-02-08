import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card"
import { 
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table"
import { Badge } from "@/components/ui/badge"
import { 
  FileDown, 
  Calendar,
  TrendingUp,
  AlertCircle,
  Box,
  BarChart3
} from "lucide-react"
import { DatePickerWithRange } from "@/components/ui/date-range-picker"
import { addDays } from "date-fns"
import { DateRange } from "react-day-picker"

// Mock data
const mockMovements = [
  { 
    date: "2024-02-08 14:30",
    drawer: "A1",
    component: "ATMega328P",
    action: "uitname",
    quantity: 5,
    user: "Jan"
  },
  { 
    date: "2024-02-08 11:15",
    drawer: "B3",
    component: "10k Resistor",
    action: "toevoeging",
    quantity: 100,
    user: "Peter"
  },
]

const mockLowStock = [
  {
    component: "ATMega328P",
    drawer: "A1",
    current: 5,
    minimum: 10,
    maximum: 50
  },
  {
    component: "100uF Capacitor",
    drawer: "C2",
    current: 8,
    minimum: 20,
    maximum: 100
  }
]

// Helper function to export to CSV
const exportToCSV = (data: any[], filename: string) => {
  if (data.length === 0) return

  // Convert object keys to header row
  const headers = Object.keys(data[0])
  const csvContent = [
    headers.join(','), // Header row
    ...data.map(row => 
      headers.map(header => 
        JSON.stringify(row[header] ?? '')
      ).join(',')
    )
  ].join('\\n')

  // Create and trigger download
  const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' })
  const link = document.createElement('a')
  if (link.download !== undefined) {
    const url = URL.createObjectURL(blob)
    link.setAttribute('href', url)
    link.setAttribute('download', filename)
    link.style.visibility = 'hidden'
    document.body.appendChild(link)
    link.click()
    document.body.removeChild(link)
  }
}

export default function ReportsPage() {
  const [dateRange, setDateRange] = useState<DateRange | undefined>({
    from: new Date(),
    to: addDays(new Date(), 7),
  })
  const [reportType, setReportType] = useState("movements")

  return (
    <div className="container mx-auto p-6 space-y-6">
      <div className="flex justify-between items-center">
        <h1 className="text-2xl font-bold">Rapporten</h1>
      </div>

      {/* Report Configuration */}
      <Card>
        <CardHeader>
          <CardTitle>Rapport Configuratie</CardTitle>
          <CardDescription>
            Selecteer het type rapport en de periode
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="flex flex-col sm:flex-row gap-4">
            <div className="flex-1">
              <Select 
                value={reportType} 
                onValueChange={setReportType}
              >
                <SelectTrigger>
                  <SelectValue placeholder="Selecteer rapport type" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="movements">
                    <div className="flex items-center gap-2">
                      <TrendingUp className="h-4 w-4" />
                      <span>Bewegingen Rapport</span>
                    </div>
                  </SelectItem>
                  <SelectItem value="stock">
                    <div className="flex items-center gap-2">
                      <Box className="h-4 w-4" />
                      <span>Voorraad Rapport</span>
                    </div>
                  </SelectItem>
                  <SelectItem value="alerts">
                    <div className="flex items-center gap-2">
                      <AlertCircle className="h-4 w-4" />
                      <span>Lage Voorraad Alerts</span>
                    </div>
                  </SelectItem>
                  <SelectItem value="usage">
                    <div className="flex items-center gap-2">
                      <BarChart3 className="h-4 w-4" />
                      <span>Gebruiks Statistieken</span>
                    </div>
                  </SelectItem>
                </SelectContent>
              </Select>
            </div>
            <div className="flex-1">
              <DatePickerWithRange 
                date={dateRange} 
                setDate={setDateRange}
              />
            </div>
            <Button 
              variant="outline"
              onClick={() => exportToCSV(mockMovements, 'rapport.csv')}
            >
              <FileDown className="mr-2 h-4 w-4" />
              Exporteer CSV
            </Button>
          </div>
        </CardContent>
      </Card>

      {/* Movements Report */}
      {reportType === "movements" && (
        <Card>
          <CardHeader>
            <CardTitle>Bewegingen Rapport</CardTitle>
            <CardDescription>
              Overzicht van alle lade bewegingen
            </CardDescription>
          </CardHeader>
          <CardContent>
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Datum</TableHead>
                  <TableHead>Lade</TableHead>
                  <TableHead>Component</TableHead>
                  <TableHead>Actie</TableHead>
                  <TableHead>Aantal</TableHead>
                  <TableHead>Gebruiker</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {mockMovements.map((movement, idx) => (
                  <TableRow key={idx}>
                    <TableCell>{movement.date}</TableCell>
                    <TableCell>{movement.drawer}</TableCell>
                    <TableCell>{movement.component}</TableCell>
                    <TableCell>
                      <Badge variant={movement.action === "uitname" ? "destructive" : "default"}>
                        {movement.action}
                      </Badge>
                    </TableCell>
                    <TableCell>{movement.quantity}</TableCell>
                    <TableCell>{movement.user}</TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </CardContent>
        </Card>
      )}

      {/* Low Stock Alerts */}
      {reportType === "alerts" && (
        <Card>
          <CardHeader>
            <CardTitle>Lage Voorraad Alerts</CardTitle>
            <CardDescription>
              Componenten die onder het minimum voorraadniveau zitten
            </CardDescription>
          </CardHeader>
          <CardContent>
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Component</TableHead>
                  <TableHead>Lade</TableHead>
                  <TableHead>Huidige Voorraad</TableHead>
                  <TableHead>Minimum</TableHead>
                  <TableHead>Maximum</TableHead>
                  <TableHead>Status</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {mockLowStock.map((item, idx) => (
                  <TableRow key={idx}>
                    <TableCell>{item.component}</TableCell>
                    <TableCell>{item.drawer}</TableCell>
                    <TableCell>{item.current}</TableCell>
                    <TableCell>{item.minimum}</TableCell>
                    <TableCell>{item.maximum}</TableCell>
                    <TableCell>
                      <Badge variant="destructive">
                        Lage voorraad
                      </Badge>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </CardContent>
        </Card>
      )}

      {/* Usage Statistics */}
      {reportType === "usage" && (
        <Card>
          <CardHeader>
            <CardTitle>Gebruiks Statistieken</CardTitle>
            <CardDescription>
              Analyse van component gebruik over tijd
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="h-[300px] flex items-center justify-center text-muted-foreground">
              Gebruiks statistieken grafiek komt hier
            </div>
          </CardContent>
        </Card>
      )}
    </div>
  )
}