import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card"
import { 
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import { Badge } from "@/components/ui/badge"
import { 
  Table, 
  TableBody, 
  TableCell, 
  TableHead, 
  TableHeader, 
  TableRow 
} from "@/components/ui/table"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import { Plus, Search, Filter, Tag } from "lucide-react"

// Mock data
const mockComponents = [
  { 
    id: 1, 
    name: "ATMega328P", 
    drawer: "A1", 
    quantity: 15,
    description: "8-bit AVR Microcontroller",
    manufacturer: "Microchip",
    tags: ["MCU", "IC", "Digital"]
  },
  { 
    id: 2, 
    name: "10k Resistor", 
    drawer: "B3", 
    quantity: 100,
    description: "1/4W Through Hole Resistor",
    manufacturer: "Yageo",
    tags: ["Resistor", "Passive"]
  },
]

const mockTags = ["MCU", "IC", "Digital", "Resistor", "Passive", "Capacitor", "LED", "Sensor"]
const mockDrawers = ["A1", "A2", "B1", "B2", "B3", "C1", "C2"]

export default function ComponentsPage() {
  const [searchTerm, setSearchTerm] = useState("")
  const [selectedTags, setSelectedTags] = useState<string[]>([])
  const [components, setComponents] = useState(mockComponents)
  
  // New component form state
  const [newComponent, setNewComponent] = useState({
    name: "",
    drawer: "",
    quantity: "",
    description: "",
    manufacturer: "",
    tags: [] as string[]
  })

  const handleAddComponent = () => {
    if (newComponent.name && newComponent.drawer) {
      setComponents([
        ...components,
        {
          id: components.length + 1,
          ...newComponent,
          quantity: parseInt(newComponent.quantity) || 0
        }
      ])
      // Reset form
      setNewComponent({
        name: "",
        drawer: "",
        quantity: "",
        description: "",
        manufacturer: "",
        tags: []
      })
    }
  }

  const toggleTag = (tag: string) => {
    setSelectedTags(current =>
      current.includes(tag)
        ? current.filter(t => t !== tag)
        : [...current, tag]
    )
  }

  const filteredComponents = components.filter(component => {
    const matchesSearch = component.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         component.description.toLowerCase().includes(searchTerm.toLowerCase())
    const matchesTags = selectedTags.length === 0 || 
                       selectedTags.every(tag => component.tags.includes(tag))
    return matchesSearch && matchesTags
  })

  return (
    <div className="container mx-auto p-6 space-y-6">
      <div className="flex justify-between items-center">
        <h1 className="text-2xl font-bold">Componenten Beheer</h1>
        <Dialog>
          <DialogTrigger asChild>
            <Button>
              <Plus className="mr-2 h-4 w-4" />
              Nieuw Component
            </Button>
          </DialogTrigger>
          <DialogContent className="sm:max-w-[600px]">
            <DialogHeader>
              <DialogTitle>Nieuw Component Toevoegen</DialogTitle>
              <DialogDescription>
                Vul de details in van het nieuwe component
              </DialogDescription>
            </DialogHeader>
            <div className="grid gap-4 py-4">
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <label className="text-sm font-medium">Naam</label>
                  <Input
                    value={newComponent.name}
                    onChange={(e) => setNewComponent({...newComponent, name: e.target.value})}
                    placeholder="Component naam"
                  />
                </div>
                <div className="space-y-2">
                  <label className="text-sm font-medium">Lade</label>
                  <Select
                    value={newComponent.drawer}
                    onValueChange={(value) => setNewComponent({...newComponent, drawer: value})}
                  >
                    <SelectTrigger>
                      <SelectValue placeholder="Selecteer lade" />
                    </SelectTrigger>
                    <SelectContent>
                      {mockDrawers.map(drawer => (
                        <SelectItem key={drawer} value={drawer}>
                          Lade {drawer}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
              </div>
              
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <label className="text-sm font-medium">Aantal</label>
                  <Input
                    type="number"
                    value={newComponent.quantity}
                    onChange={(e) => setNewComponent({...newComponent, quantity: e.target.value})}
                    placeholder="Voorraad aantal"
                  />
                </div>
                <div className="space-y-2">
                  <label className="text-sm font-medium">Fabrikant</label>
                  <Input
                    value={newComponent.manufacturer}
                    onChange={(e) => setNewComponent({...newComponent, manufacturer: e.target.value})}
                    placeholder="Fabrikant naam"
                  />
                </div>
              </div>

              <div className="space-y-2">
                <label className="text-sm font-medium">Beschrijving</label>
                <Input
                  value={newComponent.description}
                  onChange={(e) => setNewComponent({...newComponent, description: e.target.value})}
                  placeholder="Component beschrijving"
                />
              </div>

              <div className="space-y-2">
                <label className="text-sm font-medium">Tags</label>
                <div className="flex flex-wrap gap-2">
                  {mockTags.map(tag => (
                    <Badge
                      key={tag}
                      variant={newComponent.tags.includes(tag) ? "default" : "outline"}
                      className="cursor-pointer"
                      onClick={() => setNewComponent({
                        ...newComponent,
                        tags: newComponent.tags.includes(tag)
                          ? newComponent.tags.filter(t => t !== tag)
                          : [...newComponent.tags, tag]
                      })}
                    >
                      {tag}
                    </Badge>
                  ))}
                </div>
              </div>
            </div>
            <div className="flex justify-end gap-4">
              <DialogTrigger asChild>
                <Button variant="outline">Annuleren</Button>
              </DialogTrigger>
              <Button onClick={handleAddComponent}>Component Toevoegen</Button>
            </div>
          </DialogContent>
        </Dialog>
      </div>

      {/* Search and Filter */}
      <Card>
        <CardContent className="p-4">
          <div className="flex gap-4">
            <div className="relative flex-1">
              <Search className="absolute left-2 top-2.5 h-4 w-4 text-muted-foreground" />
              <Input
                placeholder="Zoek componenten..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-8"
              />
            </div>
            <Button variant="outline">
              <Filter className="mr-2 h-4 w-4" />
              Filter
            </Button>
          </div>
          <div className="mt-4">
            <div className="flex items-center gap-2">
              <Tag className="h-4 w-4 text-muted-foreground" />
              <span className="text-sm text-muted-foreground">Filter op tags:</span>
            </div>
            <div className="flex flex-wrap gap-2 mt-2">
              {mockTags.map(tag => (
                <Badge
                  key={tag}
                  variant={selectedTags.includes(tag) ? "default" : "outline"}
                  className="cursor-pointer"
                  onClick={() => toggleTag(tag)}
                >
                  {tag}
                </Badge>
              ))}
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Components Table */}
      <Card>
        <CardHeader>
          <CardTitle>Componenten Overzicht</CardTitle>
          <CardDescription>
            Totaal: {filteredComponents.length} componenten
          </CardDescription>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Naam</TableHead>
                <TableHead>Beschrijving</TableHead>
                <TableHead>Lade</TableHead>
                <TableHead>Voorraad</TableHead>
                <TableHead>Tags</TableHead>
                <TableHead>Fabrikant</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {filteredComponents.map((component) => (
                <TableRow key={component.id}>
                  <TableCell className="font-medium">{component.name}</TableCell>
                  <TableCell>{component.description}</TableCell>
                  <TableCell>{component.drawer}</TableCell>
                  <TableCell>{component.quantity}</TableCell>
                  <TableCell>
                    <div className="flex flex-wrap gap-1">
                      {component.tags.map(tag => (
                        <Badge key={tag} variant="secondary">
                          {tag}
                        </Badge>
                      ))}
                    </div>
                  </TableCell>
                  <TableCell>{component.manufacturer}</TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </CardContent>
      </Card>
    </div>
  )
}