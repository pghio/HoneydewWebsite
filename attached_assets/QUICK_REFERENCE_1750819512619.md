# 🚀 Quick Reference: Import Patterns

## Most Common Imports

### Forms & Layout (One Import Does It All)
```typescript
// ✅ Best Practice - Single barrel import
import { 
  Button, Input, Form, FormField, FormControl,
  Card, CardContent, CardHeader,
  Dialog, DialogContent, DialogHeader
} from '@/components/Shared/common';
```

### Feature Components
```typescript
// Lists feature
import { ListsContainer, CreateListModal, List, ListItem } from '@/components/Lists';

// Calendar feature  
import { MonthView, WeekView, DayView } from '@/components/Calendar';

// Authentication
import { AuthForm, ProtectedRoute } from '@/components/Shared/auth';
```

### Contexts & Hooks
```typescript
// Always use absolute imports
import { useAuth } from '@/context/AuthContext';
import { useFamilyMembers } from '@/hooks/useFamilyMembers';
```

## Quick Rules ⚡

### ✅ DO
- Use `@/` for all imports
- Prefer barrel imports: `@/components/Shared/common`
- Consolidate multiple imports from same barrel

### ❌ DON'T  
- Use deep relative imports: `../../../`
- Mix barrel and individual imports unnecessarily
- Import directly from files when barrel exists

## Error Checking
```bash
npm run check    # TypeScript errors
```

**Current Status**: 88 errors (down from 114) ✨

---
**Full Guide**: See `docs/IMPORT_PATTERNS.md` for complete documentation 