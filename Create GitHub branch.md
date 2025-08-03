# How to Create a New Branch from Main Branch in GitHub

This guide covers multiple methods to create a new branch from the main branch for your GitHub project.

## Method 1: Using GitHub Web Interface (Easiest)

### Step 1: Navigate to Your Repository
1. Go to your GitHub repository: `https://github.com/TerryALewis/CSLewisPhotos`
2. Make sure you're on the **main** branch (check the branch dropdown on the left)

### Step 2: Create New Branch
1. Click on the **branch dropdown** (shows "main" by default)
2. Type your new branch name in the text field (e.g., `feature/new-gallery-layout`)
3. Click **"Create branch: your-branch-name from 'main'"**
4. GitHub will automatically switch you to the new branch

### Step 3: Start Working
- You're now on your new branch
- Any changes you make will be isolated from the main branch
- You can edit files directly in GitHub or clone locally

## Method 2: Using Git Commands Locally (Recommended for Development)

### Step 1: Ensure You're on Main Branch
```bash
# Check current branch
git branch

# Switch to main branch if not already there
git checkout main

# Pull latest changes from remote
git pull origin main
```

### Step 2: Create and Switch to New Branch
```bash
# Create new branch and switch to it (one command)
git checkout -b feature/your-branch-name

# Alternative: Create branch first, then switch
git branch feature/your-branch-name
git checkout feature/your-branch-name
```

### Step 3: Push New Branch to GitHub
```bash
# Push the new branch to GitHub
git push -u origin feature/your-branch-name
```

## Method 3: Using GitHub CLI (For Command Line Enthusiasts)

### Prerequisites
Install GitHub CLI if not already installed:
```bash
# macOS
brew install gh

# Or download from https://cli.github.com/
```

### Create Branch
```bash
# Authenticate (first time only)
gh auth login

# Create and checkout new branch
gh repo clone TerryALewis/CSLewisPhotos
cd CSLewisPhotos
git checkout main
git pull origin main
git checkout -b feature/your-branch-name
git push -u origin feature/your-branch-name
```

## Branch Naming Conventions

Use descriptive, consistent branch names:

### Feature Branches
```
feature/user-authentication
feature/payment-integration
feature/photo-gallery-redesign
feature/convex-database-migration
```

### Bug Fix Branches
```
bugfix/cart-quantity-calculation
bugfix/stripe-redirect-issue
bugfix/mobile-responsive-layout
```

### Hotfix Branches
```
hotfix/security-vulnerability
hotfix/payment-gateway-down
hotfix/critical-ui-bug
```

### Experimental Branches
```
experiment/new-ui-framework
experiment/performance-optimization
experiment/ai-photo-tagging
```

## Best Practices

### 1. Always Start from Updated Main
```bash
git checkout main
git pull origin main
git checkout -b your-new-branch
```

### 2. Use Descriptive Names
- ✅ `feature/convex-integration`
- ✅ `bugfix/cart-total-calculation`
- ❌ `my-branch`
- ❌ `test`
- ❌ `branch1`

### 3. Keep Branches Focused
- One feature/fix per branch
- Avoid mixing multiple unrelated changes
- Makes code review easier

### 4. Regular Commits
```bash
git add .
git commit -m "Add cart quantity update functionality"
git push origin your-branch-name
```

### 5. Stay Updated with Main
```bash
# Regularly merge main into your feature branch
git checkout main
git pull origin main
git checkout your-branch-name
git merge main
```

## Working with Your New Branch

### Making Changes
1. Edit files in your preferred editor
2. Stage changes: `git add .`
3. Commit changes: `git commit -m "Descriptive message"`
4. Push to GitHub: `git push origin your-branch-name`

### Creating Pull Request
1. Go to your GitHub repository
2. You'll see a banner: "your-branch-name had recent pushes"
3. Click **"Compare & pull request"**
4. Fill in title and description
5. Select reviewers if needed
6. Click **"Create pull request"**

### Merging Back to Main
After code review and approval:
1. Click **"Merge pull request"** in GitHub
2. Choose merge type:
   - **Create a merge commit** (preserves branch history)
   - **Squash and merge** (combines all commits)
   - **Rebase and merge** (clean linear history)
3. Click **"Confirm merge"**
4. Optionally delete the feature branch

## Cleanup After Merge

### Delete Remote Branch (if not done automatically)
```bash
git push origin --delete your-branch-name
```

### Delete Local Branch
```bash
git checkout main
git pull origin main
git branch -d your-branch-name
```

## Common Git Commands Reference

```bash
# View all branches
git branch -a

# Switch branches
git checkout branch-name

# Create and switch to new branch
git checkout -b new-branch-name

# Push new branch to remote
git push -u origin branch-name

# Pull latest changes
git pull origin branch-name

# Merge another branch into current branch
git merge other-branch-name

# Check status
git status

# View commit history
git log --oneline

# View differences
git diff
```

## Troubleshooting

### Branch Already Exists
```bash
# If branch exists locally but not remotely
git push -u origin existing-branch-name

# If branch exists remotely but not locally
git checkout -b branch-name origin/branch-name
```

### Merge Conflicts
```bash
# When conflicts occur during merge
git status  # Shows conflicted files
# Edit files to resolve conflicts
git add .
git commit -m "Resolve merge conflicts"
```

### Undo Last Commit (before push)
```bash
git reset --soft HEAD~1  # Keep changes staged
git reset --hard HEAD~1  # Discard changes completely
```

## Example Workflow: Adding a New Feature

```bash
# 1. Start from updated main
git checkout main
git pull origin main

# 2. Create feature branch
git checkout -b feature/new-photo-filters

# 3. Make changes and commit
# ... edit files ...
git add .
git commit -m "Add basic photo filter functionality"

# 4. Push to GitHub
git push -u origin feature/new-photo-filters

# 5. Continue development
# ... more changes ...
git add .
git commit -m "Add advanced filter options"
git push origin feature/new-photo-filters

# 6. Create pull request on GitHub
# 7. After review and approval, merge via GitHub UI
# 8. Clean up locally
git checkout main
git pull origin main
git branch -d feature/new-photo-filters
```

This workflow ensures clean, organized development with proper version control! 🚀
