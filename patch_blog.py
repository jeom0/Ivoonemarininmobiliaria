import re

with open("src/components/BlogForm.tsx", "r") as f:
    content = f.read()

# Replace the entire action bar at the end (from <div className="bg-surface-bright rounded-xl border border-outline-variant/50 p-6 flex flex-col md:flex-row items-center justify-between gap-4"> to the end of form)
target_start = '<div className="bg-surface-bright rounded-xl border border-outline-variant/50 p-6 flex flex-col md:flex-row items-center justify-between gap-4">'
target_end = '    </form>'

start_idx = content.find(target_start)
end_idx = content.find(target_end)

# Also we need to change how handleSubmit works, or we can use two different functions handleSaveDraft and handlePublish, or we can just set formData.status before calling handleSubmit, but handleSubmit takes event.
# Actually, it's easier to add `const handleAction = async (status: string) => { ... }` and call it from the buttons.
# Let's replace the handleSubmit entirely.
