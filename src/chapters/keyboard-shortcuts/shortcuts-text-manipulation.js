export const shortcutsTextManipulation = {
  id: 'shortcuts-text-manipulation',
  title: 'Text Manipulation',
  sectionId: 'keyboard-shortcuts',
  previousChapterId: 'shortcuts-os-control',
  exercise: null,
  content: `
# Text Manipulation

As a developer, you'll spend most of your time working with text - writing code, editing documentation, and manipulating data. Mastering text manipulation shortcuts is crucial for efficient coding and will dramatically speed up your development workflow.

## Basic Editing Operations

### **Universal Copy, Cut, and Paste**
- **Ctrl + C** (Cmd + C on Mac): Copy selected text
- **Ctrl + X** (Cmd + X on Mac): Cut selected text
- **Ctrl + V** (Cmd + V on Mac): Paste from clipboard
- **Ctrl + Shift + V** (Cmd + Shift + V on Mac): Paste without formatting (in many applications)

### **Advanced Clipboard Operations**
- **Ctrl + Shift + C** (Cmd + Shift + C on Mac): Copy file path (in many code editors)
- **Ctrl + Alt + V**: Paste special or show clipboard history (varies by application)

## Undo and Redo Operations

### **Basic Undo/Redo**
- **Ctrl + Z** (Cmd + Z on Mac): Undo last action
- **Ctrl + Y** (Cmd + Shift + Z on Mac): Redo last undone action
- **Ctrl + Shift + Z**: Alternative redo shortcut (Windows/Linux)

### **Advanced Undo Operations**
Many code editors provide more sophisticated undo capabilities:
- **Ctrl + U**: Undo cursor position (VS Code)
- **Alt + Backspace**: Undo word deletion
- **Ctrl + Backspace**: Delete previous word

## Text Selection Techniques

### **Basic Selection**
- **Shift + Arrow Keys**: Extend selection character by character or line by line
- **Ctrl + Shift + Arrow Keys** (Cmd + Shift + Arrow Keys on Mac): Select word by word
- **Shift + Home/End**: Select to beginning/end of line
- **Ctrl + Shift + Home/End** (Cmd + Shift + Home/End on Mac): Select to beginning/end of document

### **Advanced Selection**
- **Ctrl + A** (Cmd + A on Mac): Select all text
- **Ctrl + L** (Cmd + L on Mac): Select entire line (in many code editors)
- **Ctrl + D** (Cmd + D on Mac): Select word at cursor or next occurrence (VS Code, Sublime)
- **Alt + Shift + Arrow Keys**: Column/block selection (many editors)
- **Ctrl + Shift + L** (Cmd + Shift + L on Mac): Select all occurrences of current selection

### **Multi-Cursor Selection**
Modern code editors support multiple cursors for simultaneous editing:
- **Alt + Click**: Add cursor at click position
- **Ctrl + Alt + Up/Down** (Cmd + Option + Up/Down on Mac): Add cursor above/below
- **Ctrl + Shift + K** (Cmd + Shift + K on Mac): Delete line
- **Ctrl + Enter** (Cmd + Enter on Mac): Insert line below cursor
- **Ctrl + Shift + Enter** (Cmd + Shift + Enter on Mac): Insert line above cursor

## Find and Replace Operations

### **Basic Find Operations**
- **Ctrl + F** (Cmd + F on Mac): Open find dialog
- **F3** (Cmd + G on Mac): Find next occurrence
- **Shift + F3** (Cmd + Shift + G on Mac): Find previous occurrence
- **Ctrl + G** (Cmd + G on Mac): Go to line number
- **Escape**: Close find dialog

### **Advanced Find and Replace**
- **Ctrl + H** (Cmd + Option + F on Mac): Open find and replace dialog
- **Ctrl + Shift + F** (Cmd + Shift + F on Mac): Find in files (project-wide search)
- **Ctrl + Shift + H** (Cmd + Shift + H on Mac): Replace in files
- **Alt + Enter**: Select all find matches (VS Code)
- **Ctrl + F2** (Cmd + F2 on Mac): Select all occurrences of current word

### **Regular Expression Search**
- **Alt + R**: Toggle regex mode in find dialog (many editors)
- **Alt + C**: Toggle case sensitivity
- **Alt + W**: Toggle whole word matching

## Advanced Text Manipulation

### **Line Operations**
- **Ctrl + Shift + K** (Cmd + Shift + K on Mac): Delete entire line
- **Ctrl + Shift + D** (Cmd + Shift + D on Mac): Duplicate line
- **Alt + Up/Down Arrow**: Move line up/down
- **Shift + Alt + Up/Down Arrow**: Copy line up/down
- **Ctrl + ]** (Cmd + ] on Mac): Indent line
- **Ctrl + [** (Cmd + [ on Mac): Unindent line

### **Word Operations**
- **Ctrl + Right/Left Arrow** (Option + Right/Left on Mac): Move cursor by word
- **Ctrl + Backspace** (Option + Backspace on Mac): Delete previous word
- **Ctrl + Delete** (Option + Delete on Mac): Delete next word
- **Ctrl + Shift + Right/Left**: Select word by word

### **Code-Specific Operations**
- **Ctrl + /** (Cmd + / on Mac): Toggle line comment
- **Ctrl + Shift + /** (Cmd + Shift + / on Mac): Toggle block comment
- **Tab**: Indent selection
- **Shift + Tab**: Unindent selection
- **Ctrl + K, Ctrl + F** (Cmd + K, Cmd + F on Mac): Format selection

## Navigation Shortcuts

### **Document Navigation**
- **Ctrl + Home/End** (Cmd + Home/End on Mac): Go to beginning/end of document
- **Page Up/Page Down**: Scroll by page
- **Ctrl + Page Up/Down**: Navigate between tabs
- **Ctrl + G** (Cmd + G on Mac): Go to line number
- **Ctrl + P** (Cmd + P on Mac): Quick file open (many editors)

### **Code Navigation**
- **Ctrl + Click** (Cmd + Click on Mac): Go to definition
- **Alt + Left/Right Arrow**: Navigate back/forward in editor history
- **Ctrl + Shift + O** (Cmd + Shift + O on Mac): Go to symbol in file
- **Ctrl + T** (Cmd + T on Mac): Go to symbol in workspace
- **F12**: Go to definition
- **Shift + F12**: Find all references

## Text Transformation

### **Case Changes**
- **Ctrl + Shift + U**: Transform to uppercase (many editors)
- **Ctrl + Shift + L**: Transform to lowercase (many editors)
- **Ctrl + Shift + P**: Transform to title case (some editors)

### **Text Formatting**
- **Ctrl + B** (Cmd + B on Mac): Bold text (in rich text editors)
- **Ctrl + I** (Cmd + I on Mac): Italic text (in rich text editors)
- **Ctrl + U** (Cmd + U on Mac): Underline text (in rich text editors)

## Editor-Specific Power Features

### **VS Code Specific**
- **Ctrl + Shift + P** (Cmd + Shift + P on Mac): Command palette
- **Ctrl + \`**: Toggle integrated terminal
- **Ctrl + Shift + \`**: Create new terminal
- **Ctrl + K, Z**: Enter Zen mode
- **Ctrl + K, V**: Open markdown preview to side

### **IntelliJ/WebStorm Specific**
- **Ctrl + W**: Extend selection
- **Ctrl + Shift + W**: Shrink selection
- **Ctrl + D**: Duplicate line or selection
- **Ctrl + Y**: Delete line
- **Shift + F6**: Rename symbol

## Pro Tips for Text Manipulation

### **Efficiency Strategies**
1. **Master Multi-Cursor Editing**: Learn to edit multiple locations simultaneously
2. **Use Find and Replace Wisely**: Regular expressions can save hours of manual editing
3. **Learn Your Editor's Shortcuts**: Each editor has unique powerful features
4. **Practice Selection Techniques**: Efficient selection is the foundation of fast editing

### **Development Workflow Integration**
- Combine text shortcuts with code navigation for seamless editing
- Use find-and-replace for refactoring variable names
- Master comment toggling for quick code testing
- Learn formatting shortcuts to maintain code style

### **Common Patterns**
- **Ctrl + D, Ctrl + D, Ctrl + D**: Select multiple instances of a word for simultaneous editing
- **Ctrl + Shift + L**: Select all instances of current selection
- **Alt + Shift + I**: Insert cursor at end of each selected line
- **Ctrl + Shift + K**: Delete line (faster than selecting and deleting)

## Building Your Text Manipulation Workflow

### **Start with the Basics**
1. Master copy, cut, paste, and undo operations
2. Learn efficient text selection techniques
3. Practice find and replace operations
4. Gradually add advanced shortcuts to your repertoire

### **Practice Recommendations**
- Use shortcuts even when they feel slower initially
- Focus on shortcuts that match your most common editing patterns
- Practice multi-cursor editing with simple exercises
- Learn one new shortcut per week and use it consistently

### **Customization Tips**
- Most editors allow shortcut customization
- Consider your hand position and comfort when choosing shortcuts
- Create consistent shortcuts across different tools when possible
- Document your custom shortcuts for reference

## Common Mistakes to Avoid

1. **Over-relying on Mouse Selection**: Force yourself to use keyboard selection
2. **Ignoring Multi-Cursor Features**: These can dramatically speed up repetitive edits
3. **Not Learning Editor-Specific Shortcuts**: Each editor has unique powerful features
4. **Forgetting About Find and Replace**: Don't manually edit repetitive changes
5. **Inconsistent Practice**: Shortcuts require muscle memory development

Mastering these text manipulation shortcuts will transform your coding efficiency. The key is consistent practice and gradually building up your shortcut vocabulary. Start with the most common operations and progressively add more advanced techniques to your workflow.

Remember: the goal isn't to memorize every shortcut, but to internalize the ones that provide the most value for your specific development tasks. With time and practice, these shortcuts will become second nature, allowing you to focus on solving problems rather than fighting with your tools.
`
};