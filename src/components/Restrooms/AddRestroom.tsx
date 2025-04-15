// src/components/Restrooms/AddRestroom.tsx
import { useState } from 'react';
import { Button } from '../ui/button';
import { Input } from '../ui/input';
import { Textarea } from '../ui/textarea';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '../ui/select';
import { Switch } from '../ui/switch';
import { Label } from '../ui/label';
import { Card, CardContent, CardHeader, CardTitle, CardFooter } from '../ui/card';

interface AddRestroomProps {
  onSubmit: (restroomData: RestroomData) => void;
  onCancel: () => void;
}

export interface RestroomData {
  name: string;
  address: string;
  description: string;
  cleanliness: 'clean' | 'average' | 'dirty';
  isAccessible: boolean;
  hasChangingTable: boolean;
  isGenderNeutral: boolean;
  rating: number;
}

export function AddRestroom({ onSubmit, onCancel }: AddRestroomProps) {
  const [formData, setFormData] = useState<RestroomData>({
    name: '',
    address: '',
    description: '',
    cleanliness: 'average',
    isAccessible: false,
    hasChangingTable: false,
    isGenderNeutral: false,
    rating: 0
  });

  const handleChange = (field: keyof RestroomData, value: any) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSubmit(formData);
  };

  return (
    <Card className="w-full max-w-md mx-auto">
      <CardHeader>
        <CardTitle className="text-xl font-bold">Add New Restroom</CardTitle>
      </CardHeader>
      <CardContent>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="name">Name</Label>
            <Input 
              id="name" 
              value={formData.name} 
              onChange={(e) => handleChange('name', e.target.value)} 
              placeholder="Restroom name or location" 
              required
            />
          </div>
          
          <div className="space-y-2">
            <Label htmlFor="address">Address</Label>
            <Input 
              id="address" 
              value={formData.address} 
              onChange={(e) => handleChange('address', e.target.value)} 
              placeholder="Street address" 
              required
            />
          </div>
          
          <div className="space-y-2">
            <Label htmlFor="description">Description</Label>
            <Textarea 
              id="description" 
              value={formData.description} 
              onChange={(e) => handleChange('description', e.target.value)} 
              placeholder="Additional details about this restroom"
              rows={3}
            />
          </div>
          
          <div className="space-y-2">
            <Label htmlFor="cleanliness">Cleanliness</Label>
            <Select 
              value={formData.cleanliness} 
              onValueChange={(value) => handleChange('cleanliness', value)}
            >
              <SelectTrigger id="cleanliness">
                <SelectValue placeholder="Select cleanliness level" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="clean">Clean</SelectItem>
                <SelectItem value="average">Average</SelectItem>
                <SelectItem value="dirty">Dirty</SelectItem>
              </SelectContent>
            </Select>
          </div>
          
          <div className="flex items-center space-x-2">
            <Switch 
              id="accessible" 
              checked={formData.isAccessible} 
              onCheckedChange={(checked) => handleChange('isAccessible', checked)} 
            />
            <Label htmlFor="accessible">Wheelchair Accessible</Label>
          </div>
          
          <div className="flex items-center space-x-2">
            <Switch 
              id="changingTable" 
              checked={formData.hasChangingTable} 
              onCheckedChange={(checked) => handleChange('hasChangingTable', checked)} 
            />
            <Label htmlFor="changingTable">Has Changing Table</Label>
          </div>
          
          <div className="flex items-center space-x-2">
            <Switch 
              id="genderNeutral" 
              checked={formData.isGenderNeutral} 
              onCheckedChange={(checked) => handleChange('isGenderNeutral', checked)} 
            />
            <Label htmlFor="genderNeutral">Gender Neutral</Label>
          </div>
          
          <div className="space-y-2">
            <Label htmlFor="rating">Rating (1-5)</Label>
            <Input 
              id="rating" 
              type="number" 
              min="1" 
              max="5" 
              value={formData.rating.toString()} 
              onChange={(e) => handleChange('rating', parseInt(e.target.value) || 0)} 
            />
          </div>
        </form>
      </CardContent>
      <CardFooter className="flex justify-end space-x-2">
        <Button variant="outline" onClick={onCancel}>Cancel</Button>
        <Button onClick={handleSubmit}>Submit</Button>
      </CardFooter>
    </Card>
  );
}