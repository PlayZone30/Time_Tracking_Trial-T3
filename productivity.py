PRODUCTIVE_APPS = {
    "Code",
    "iTerm",
    "Terminal",
    "Microsoft Word",
    "Microsoft Excel",
    "Microsoft PowerPoint",
    "Adobe Photoshop",
    "Adobe Illustrator",
    "Adobe Premiere Pro",
    "Final Cut Pro",
    "Logic Pro X",
    "Ableton Live",
    "AutoCAD",
    "SketchUp",
    "Blender",
    "Unity",
    "Unreal Engine",
}

UNPRODUCTIVE_APPS = {
    "Slack",
    "Discord",
    "Telegram",
    "WhatsApp",
    "Messages",
    "Mail",
    "TweetDeck",
    "Twitter",
    "Facebook",
    "Instagram",
    "Reddit",
    "YouTube",
    "Netflix",
    "Hulu",
    "Spotify",
    "Apple Music",
    "Steam",
    "Epic Games Launcher",
}

def calculate_productivity(app_usage):
    productive_time = 0
    unproductive_time = 0

    for app in app_usage:
        app_name = app.app_name
        duration = app.duration

        if app_name in PRODUCTIVE_APPS:
            productive_time += duration
        elif app_name in UNPRODUCTIVE_APPS:
            unproductive_time += duration

    return productive_time, unproductive_time