import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Badge } from "@/components/ui/badge"
import { Plus, Pencil, Trash2, Save, X } from "lucide-react"

// Mock data - will be replaced with database data
const initialTags = [
  { id: 1, name: "Weerstand", count: 45 },
  { id: 2, name: "Condensator", count: 32 },
  { id: 3, name: "IC", count: 28 },
  { id: 4, name: "Sensor", count: 15 },
  { id: 5, name: "LED", count: 23 },
]

export default function TagsPage() {
  const [tags, setTags] = useState(initialTags)
  const [newTag, setNewTag] = useState("")
  const [editingId, setEditingId] = useState<number | null>(null)
  const [editValue, setEditValue] = useState("")

  const handleAddTag = () => {
    if (newTag.trim()) {
      setTags([...tags, { id: tags.length + 1, name: newTag, count: 0 }])
      setNewTag("")
    }
  }

  const startEdit = (tag: typeof tags[0]) => {
    setEditingId(tag.id)
    setEditValue(tag.name)
  }

  const handleEdit = () => {
    if (editValue.trim() && editingId) {
      setTags(tags.map(tag => 
        tag.id === editingId ? { ...tag, name: editValue } : tag
      ))
      setEditingId(null)
    }
  }

  const handleDelete = (id: number) => {
    setTags(tags.filter(tag => tag.id !== id))
  }

  return (
    <div className="container mx-auto p-6 space-y-6">
      <div className="flex justify-between items-center">
        <h1 className="text-2xl font-bold">Tags Beheer</h1>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Nieuwe Tag Toevoegen</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="flex gap-4">
            <Input
              placeholder="Voer tag naam in..."
              value={newTag}
              onChange={(e) => setNewTag(e.target.value)}
              onKeyPress={(e) => e.key === 'Enter' && handleAddTag()}
            />
            <Button onClick={handleAddTag}>
              <Plus className="mr-2 h-4 w-4" />
              Tag Toevoegen
            </Button>
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Tags Overzicht</CardTitle>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Tag Naam</TableHead>
                <TableHead>Aantal Componenten</TableHead>
                <TableHead className="text-right">Acties</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {tags.map((tag) => (
                <TableRow key={tag.id}>
                  <TableCell>
                    {editingId === tag.id ? (
                      <div className="flex gap-2">
                        <Input
                          value={editValue}
                          onChange={(e) => setEditValue(e.target.value)}
                          className="max-w-[200px]"
                        />
                        <Button size="icon" variant="ghost" onClick={handleEdit}>
                          <Save className="h-4 w-4" />
                        </Button>
                        <Button size="icon" variant="ghost" onClick={() => setEditingId(null)}>
                          <X className="h-4 w-4" />
                        </Button>
                      </div>
                    ) : (
                      <Badge variant="outline">{tag.name}</Badge>
                    )}
                  </TableCell>
                  <TableCell>{tag.count}</TableCell>
                  <TableCell className="text-right">
                    <div className="flex justify-end gap-2">
                      <Button
                        size="icon"
                        variant="ghost"
                        onClick={() => startEdit(tag)}
                      >
                        <Pencil className="h-4 w-4" />
                      </Button>
                      <Button
                        size="icon"
                        variant="ghost"
                        onClick={() => handleDelete(tag.id)}
                      >
                        <Trash2 className="h-4 w-4" />
                      </Button>
                    </div>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </CardContent>
      </Card>
    </div>
  )
}