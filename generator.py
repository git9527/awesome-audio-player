import os
import json
from collections import OrderedDict
from urllib.parse import quote

root_path = os.getcwd()
mock_file_system = {}

def walk_dir(current_path):
    folders = []
    files = []

    try:
        for entry in os.scandir(current_path):

            # 忽略 .DS_Store
            if entry.name == ".DS_Store":
                continue

            rel_path = os.path.relpath(os.path.join(current_path, entry.name), root_path).replace(os.sep, "/")
            rel_path = "/" if rel_path == "." else "/" + rel_path
            rel_path_encoded = quote(rel_path)  # URL encode

            if entry.is_dir():
                folders.append({
                    "type": "folder",
                    "name": entry.name,
                    "path": rel_path_encoded
                })
                walk_dir(os.path.join(current_path, entry.name))
            else:
                files.append({
                    "type": "file",
                    "name": entry.name,
                    "path": rel_path_encoded
                })

        # 每个目录下先文件夹再文件，按名称排序
        folders.sort(key=lambda x: x["name"].lower())
        files.sort(key=lambda x: x["name"].lower())
        all_items = folders + files

        # 当前目录相对路径
        dir_key = "/" if current_path == root_path else "/" + os.path.relpath(current_path, root_path).replace(os.sep, "/")
        mock_file_system[dir_key] = all_items

    except PermissionError:
        pass

walk_dir(root_path)

# 对最外层 key 也进行排序
mock_file_system_sorted = OrderedDict(sorted(mock_file_system.items(), key=lambda x: x[0]))

# 输出 TypeScript 格式
print("export const mockFileSystem: Record<string, FileSystemItem[]> = ", json.dumps(mock_file_system_sorted, indent=4), ";")
