'use client';

import { useCallback, useEffect, useState } from 'react';
import ReactFlow, {
    Node,
    Edge,
    Background,
    Controls,
    MiniMap,
    addEdge,
    Connection,
    useNodesState,
    useEdgesState,
    BackgroundVariant,
} from 'reactflow';
import 'reactflow/dist/style.css';
import { Lightbulb, Sparkles, Map, Users, Video, Package } from 'lucide-react';
import type { APIKeys, NodeStatus } from '@/types/workflow';

interface WorkflowCanvasProps {
    selectedNodeId: string | null;
    onNodeSelect: (id: string | null) => void;
    apiKeys: APIKeys;
    isExecuting: boolean;
    onExecutionComplete: () => void;
}

const initialNodes: Node[] = [
    {
        id: '1',
        type: 'default',
        data: { label: '📝 Story Idea', status: 'pending' },
        position: { x: 250, y: 50 },
        style: {
            background: 'linear-gradient(135deg, #ff6b6b, #ff6b6bdd)',
            color: 'white',
            border: '1px solid rgba(255,255,255,0.2)',
            borderRadius: '12px',
            padding: '12px 20px',
            fontSize: '14px',
            fontWeight: '500',
        },
    },
    {
        id: '2',
        type: 'default',
        data: { label: '✨ Generate Story', status: 'pending' },
        position: { x: 250, y: 150 },
        style: {
            background: 'linear-gradient(135deg, #4ecdc4, #4ecdc4dd)',
            color: 'white',
            border: '1px solid rgba(255,255,255,0.2)',
            borderRadius: '12px',
            padding: '12px 20px',
            fontSize: '14px',
            fontWeight: '500',
        },
    },
    {
        id: '3',
        type: 'default',
        data: { label: '🗺️ Create Storyboard', status: 'pending' },
        position: { x: 250, y: 250 },
        style: {
            background: 'linear-gradient(135deg, #45b7d1, #45b7d1dd)',
            color: 'white',
            border: '1px solid rgba(255,255,255,0.2)',
            borderRadius: '12px',
            padding: '12px 20px',
            fontSize: '14px',
            fontWeight: '500',
        },
    },
    {
        id: '4',
        type: 'default',
        data: { label: '👥 Generate Characters', status: 'pending' },
        position: { x: 100, y: 370 },
        style: {
            background: 'linear-gradient(135deg, #f9ca24, #f9ca24dd)',
            color: 'white',
            border: '1px solid rgba(255,255,255,0.2)',
            borderRadius: '12px',
            padding: '12px 20px',
            fontSize: '14px',
            fontWeight: '500',
        },
    },
    {
        id: '5',
        type: 'default',
        data: { label: '🎬 Generate Scenes', status: 'pending' },
        position: { x: 250, y: 490 },
        style: {
            background: 'linear-gradient(135deg, #6c5ce7, #6c5ce7dd)',
            color: 'white',
            border: '1px solid rgba(255,255,255,0.2)',
            borderRadius: '12px',
            padding: '12px 20px',
            fontSize: '14px',
            fontWeight: '500',
        },
    },
    {
        id: '6',
        type: 'default',
        data: { label: '📦 Render Video', status: 'pending' },
        position: { x: 250, y: 590 },
        style: {
            background: 'linear-gradient(135deg, #00b894, #00b894dd)',
            color: 'white',
            border: '1px solid rgba(255,255,255,0.2)',
            borderRadius: '12px',
            padding: '12px 20px',
            fontSize: '14px',
            fontWeight: '500',
        },
    },
];

const initialEdges: Edge[] = [
    { id: 'e1-2', source: '1', target: '2', animated: true, style: { stroke: '#4ecdc4' } },
    { id: 'e2-3', source: '2', target: '3', animated: true, style: { stroke: '#45b7d1' } },
    { id: 'e3-4', source: '3', target: '4', animated: true, style: { stroke: '#f9ca24' } },
    { id: 'e3-5', source: '3', target: '5', animated: true, style: { stroke: '#6c5ce7' } },
    { id: 'e4-5', source: '4', target: '5', animated: true, style: { stroke: '#6c5ce7' } },
    { id: 'e5-6', source: '5', target: '6', animated: true, style: { stroke: '#00b894' } },
];

export default function WorkflowCanvas({
    selectedNodeId,
    onNodeSelect,
    apiKeys,
    isExecuting,
    onExecutionComplete,
}: WorkflowCanvasProps) {
    const [nodes, setNodes, onNodesChange] = useNodesState(initialNodes);
    const [edges, setEdges, onEdgesChange] = useEdgesState(initialEdges);

    const onConnect = useCallback(
        (params: Connection) => setEdges((eds) => addEdge(params, eds)),
        [setEdges]
    );

    const onNodeClick = useCallback(
        (_: React.MouseEvent, node: Node) => {
            onNodeSelect(node.id);
        },
        [onNodeSelect]
    );

    useEffect(() => {
        if (isExecuting) {
            // Simulate workflow execution
            setTimeout(() => {
                onExecutionComplete();
            }, 2000);
        }
    }, [isExecuting, onExecutionComplete]);

    return (
        <div className="w-full h-full">
            <ReactFlow
                nodes={nodes}
                edges={edges}
                onNodesChange={onNodesChange}
                onEdgesChange={onEdgesChange}
                onConnect={onConnect}
                onNodeClick={onNodeClick}
                fitView
                className="bg-transparent"
            >
                <Background
                    variant={'dots' as BackgroundVariant}
                    gap={16}
                    size={1}
                    color="rgba(255, 255, 255, 0.1)"
                />
                <Controls className="bg-white/10 backdrop-blur border border-white/10 rounded-lg" />
                <MiniMap
                    className="bg-white/5 backdrop-blur border border-white/10 rounded-lg"
                    nodeColor={(node) => {
                        const gradientColors: Record<string, string> = {
                            '1': '#ff6b6b',
                            '2': '#4ecdc4',
                            '3': '#45b7d1',
                            '4': '#f9ca24',
                            '5': '#6c5ce7',
                            '6': '#00b894',
                        };
                        return gradientColors[node.id] || '#999';
                    }}
                />
            </ReactFlow>
        </div>
    );
}
