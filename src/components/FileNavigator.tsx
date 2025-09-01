import React from "react";
import { FileSystemItem } from "../types";
import { mockFileSystem } from "../mockFileSystem";

interface FileNavigatorProps {
    currentPath: string;
    onNavigate: (path: string) => void;
    onSelectFile: (file: FileSystemItem) => void;
}

const FileNavigator: React.FC<FileNavigatorProps> = ({
                                                         currentPath,
                                                         onNavigate,
                                                         onSelectFile,
                                                     }) => {

    const decodedPath = decodeURIComponent(currentPath)
    const items = mockFileSystem[decodedPath] || [];

    // 拆分路径生成面包屑
    const parts = currentPath.split("/").filter(Boolean);
    const breadcrumbs = ["/", ...parts.map((_, idx) => "/" + parts.slice(0, idx + 1).join("/"))];

    return (
        <div className="border-b p-2 bg-gray-50">
            {/* 面包屑导航 */}
            <div className="mb-2 text-sm text-gray-600 flex items-center space-x-1">
                {breadcrumbs.map((bc, i) => {
                    const name = bc === "/" ? "Home" : decodeURIComponent(bc.split("/").pop() || "");
                    return (
                        <span key={bc} className="flex items-center space-x-1">
              <button
                  onClick={() => onNavigate(bc)}
                  className="text-blue-600 hover:underline"
              >
                {name}
              </button>
                            {i < breadcrumbs.length - 1 && <span>/</span>}
            </span>
                    );
                })}
            </div>

            {/* 当前目录下的内容 */}
            <ul className="space-y-1">
                {items.map((item) => (
                    <li key={item.path}>
                        {item.type === "folder" ? (
                            <button
                                className="w-full text-left px-2 py-1 rounded hover:bg-gray-200 font-medium"
                                onClick={() => onNavigate(item.path)}
                            >
                                📁 {item.name}
                            </button>
                        ) : (
                            <button
                                className="w-full text-left px-2 py-1 rounded hover:bg-gray-100"
                                onClick={() => onSelectFile(item)}
                            >
                                🎵 {item.name}
                            </button>
                        )}
                    </li>
                ))}
            </ul>
        </div>
    );
};

export default FileNavigator;
