# Import Patterns & Barrel Exports Guide

## Overview

This project follows a clean, standardized import pattern using absolute imports and barrel exports for better maintainability and developer experience.

## 🎯 Import Hierarchy (Preferred Order)

### 1. Main Barrel Imports (PREFERRED)
Use the most consolidated barrel export available:

```typescript
// ✅ BEST: Single main barrel import
import { Button, Input, Card, Dialog, DialogContent } from '@/components/Shared/common';

// ✅ GOOD: Feature-level barrel import
import { ListsContainer, CreateListModal } from '@/components/Lists';
```

### 2. Specific Barrel Imports (GOOD)
When you only need components from one category:

```typescript
// ✅ GOOD: Forms-only import
import { Button, Input, Form, FormField } from '@/components/Shared/common/forms';

// ✅ GOOD: Layout-only import  
import { Card, Dialog, Sheet } from '@/components/Shared/common/layout';
```

### 3. Individual File Imports (LAST RESORT)
Only use when barrel imports aren't available:

```typescript
// ⚠️ ONLY when needed: Individual file import
import { Button } from '@/components/Shared/common/forms/button';
```

## 📁 Available Barrel Exports

### Core Shared Components

#### `@/components/Shared/common` (Main Barrel)
**All forms and layout components in one import:**

```typescript
// Forms: Button, Input, Textarea, Select, Checkbox, etc.
// Layout: Card, Dialog, Sheet, Drawer, etc.
import { 
  Button, Input, Form, FormField, FormControl,
  Card, CardContent, CardHeader,
  Dialog, DialogContent, DialogHeader
} from '@/components/Shared/common';
```

#### `@/components/Shared/common/forms` (Forms Only)
```typescript
import { Button, Input, Form, FormField, Select, Checkbox } from '@/components/Shared/common/forms';
```

#### `@/components/Shared/common/layout` (Layout Only)
```typescript
import { Card, Dialog, Sheet, Drawer, AspectRatio } from '@/components/Shared/common/layout';
```

### Feature Components

#### `@/components/Lists` (Complete Lists Feature)
```typescript
import { 
  ListsContainer, 
  CreateListModal, 
  ItemComponent,
  List, ListSection, ListItem // Types
} from '@/components/Lists';
```

#### `@/components/Calendar` (Complete Calendar Feature)
```typescript
import { 
  MonthView, 
  WeekView, 
  DayView,
  CalendarEventItem // Types
} from '@/components/Calendar';
```

#### `@/components/Shared/auth` (Authentication)
```typescript
import { 
  AuthForm, 
  ProtectedRoute, 
  AuthModal, 
  UserProfileDropdown 
} from '@/components/Shared/auth';
```

#### `@/components/Shared/components` (Profile Components)
```typescript
import { 
  ProfileEditor, 
  ProfilePreview, 
  SignedOutProfile 
} from '@/components/Shared/components';
```

## 🚫 Anti-Patterns (DON'T DO)

### ❌ Deep Relative Imports
```typescript
// ❌ BAD: Deep relative imports
import { Button } from '../../../Shared/common/forms/button';
import { Card } from '../../../../Shared/common/layout/card';
```

### ❌ Mixed Import Styles
```typescript
// ❌ BAD: Mixing barrel and individual imports unnecessarily
import { Button } from '@/components/Shared/common';
import { Input } from '@/components/Shared/common/forms/input'; // Should use barrel
```

### ❌ Verbose Individual Imports
```typescript
// ❌ BAD: Multiple individual imports when barrel is available
import { Button } from '@/components/Shared/common/forms/button';
import { Input } from '@/components/Shared/common/forms/input';
import { Card } from '@/components/Shared/common/layout/card';

// ✅ GOOD: Single barrel import
import { Button, Input, Card } from '@/components/Shared/common';
```

## 🛠️ Migration Examples

### Before vs After

**Before** (verbose individual imports):
```typescript
import { Button } from '@/components/Shared/common/forms/button';
import { Input } from '@/components/Shared/common/forms/input';
import { Form, FormControl, FormField } from '@/components/Shared/common/forms/form';
import { Card, CardContent, CardHeader } from '@/components/Shared/common/layout/card';
import { Dialog, DialogContent, DialogHeader } from '@/components/Shared/common/layout/dialog';
```

**After** (clean barrel import):
```typescript
import { 
  Button, Input, Form, FormControl, FormField,
  Card, CardContent, CardHeader,
  Dialog, DialogContent, DialogHeader 
} from '@/components/Shared/common';
```

**Result**: 5 import lines → 1 import line (80% reduction)

## 🔧 Implementation Status

### ✅ Completed Barrel Exports

- **Forms**: All form components (`Button`, `Input`, `Form`, `Select`, etc.)
- **Layout**: All layout components (`Card`, `Dialog`, `Sheet`, etc.)
- **Common**: Combined forms + layout barrel
- **Lists**: Complete Lists feature barrel (already existed)
- **Calendar**: Complete Calendar feature barrel (already existed)
- **Auth**: Authentication components barrel (already existed)
- **Profile**: Profile-related components barrel

### 🚧 Future Barrel Export Opportunities

These directories could benefit from barrel exports in future phases:

- `@/components/Shared` individual components (tabs, toast, etc.)
- `@/hooks` custom hooks
- `@/utils` utility functions
- `@/types` type definitions

## 📋 Development Guidelines

### When Adding New Components

1. **Check existing barrels first** - Can your component fit in an existing barrel?
2. **Add to appropriate barrel** - Update the relevant `index.ts` file
3. **Use the barrel in imports** - Don't import directly from the new file
4. **Update documentation** - Add your component to this guide

### When Refactoring Imports

1. **Start with main barrels** - Use `@/components/Shared/common` when possible
2. **Consolidate imports** - Combine multiple imports into single barrel imports
3. **Test after changes** - Run `npm run check` to ensure no TypeScript errors
4. **Update consistently** - If you update one file, consider updating similar patterns in related files

## 🎯 Benefits Achieved

- **Cleaner Code**: 3-5 import lines reduced to 1 in many files
- **Better Maintainability**: Moving files only requires updating barrel exports
- **Improved DX**: Auto-completion shows all available components from one location
- **Consistent Patterns**: Clear hierarchy and standards for all developers
- **Future-Proof**: Easy to add new components without disrupting existing imports

## 📊 Performance Notes

- **Bundle Size**: Barrel exports don't increase bundle size (tree-shaking handles unused imports)
- **Build Time**: Negligible impact on build performance
- **IDE Performance**: Faster auto-completion with fewer import paths to resolve

---

**Next Steps**: Continue to use these patterns and consider extending barrel exports to additional directories as the codebase grows. 