import ReactFlow, {
    Background,
    Controls,
    Handle,
    Position,
    useNodesState,
    useEdgesState,
} from 'reactflow';
import 'reactflow/dist/style.css';

// --- 1. עיצוב הכרטיס המותאם אישית (Custom Node) ---
// זה מחליף את העיגולים המשעממים בכרטיסים המעוצבים שלך
const CustomNode = ({ data }: any) => {
    return (
        <div className="px-4 py-2 shadow-md rounded-md bg-zinc-900 border-2 border-zinc-700 min-w-[150px] text-center hover:border-primary transition-colors">
            {/* נקודות חיבור (ידיות) - למעלה, למטה, ימין, שמאל */}
            <Handle type="target" position={Position.Top} id="target-top" className="w-2 h-2 !bg-zinc-500" />
            <Handle type="target" position={Position.Left} id="target-left" className="w-2 h-2 !bg-zinc-500" />
            <Handle type="target" position={Position.Right} id="target-right" className="w-2 h-2 !bg-zinc-500" />
            <Handle type="target" position={Position.Bottom} id="target-bottom" className="w-2 h-2 !bg-zinc-500" />

            <div className="flex flex-col">
                <div className="text-xl font-bold text-white">{data.label}</div>
                {/* אם יש סטטוס, נציג אותו */}
                {data.status && (
                    <div className={`text-[15px] mt-1 font-semibold ${data.status === 'OK' ? 'text-success' : 'text-danger'}`}>
                        {data.status}
                    </div>
                )}
            </div>

            <Handle type="source" position={Position.Right} id="source-right" className="w-2 h-2 !bg-zinc-500" />
            <Handle type="source" position={Position.Bottom} id="source-bottom" className="w-2 h-2 !bg-zinc-500" />
            <Handle type="source" position={Position.Top} id="source-top" className="w-2 h-2 !bg-zinc-500" />
            <Handle type="source" position={Position.Left} id="source-left" className="w-2 h-2 !bg-zinc-500" />
        </div>
    );
};

// מגדירים ל-ReactFlow להשתמש ברכיב שלנו
const nodeTypes = { custom: CustomNode };

// --- 2. הגדרת המיקומים (כמו בשרטוט LTE) ---
const initialNodes = [
    { id: 'hss', type: 'custom', position: { x: 100, y: 600 }, data: { label: 'vHSS', status: 'OK' } },
    { id: 'sapc', type: 'custom', position: { x: -200, y: 600 }, data: { label: 'vSAPC', status: 'OK' } },
    { id: 'mme', type: 'custom', position: { x: 100, y: -50 }, data: { label: 'vMME', status: 'OK' } },
    { id: 'epg', type: 'custom', position: { x: -200, y: -50 }, data: { label: 'vEPG', status: 'OK' } },
    { id: 'bsp', type: 'custom', position: { x: 700, y: 600 }, data: { label: 'BSP', status: 'OK' } },
    { id: 'dsc', type: 'custom', position: { x: 100, y: 250 }, data: { label: 'vDSC', status: 'OK' } },
    { id: 'eda', type: 'custom', position: { x: 400, y: 450 }, data: { label: 'vEDA', status: 'OK' } },
    { id: 'dns', type: 'custom', position: { x: 400, y: -50 }, data: { label: 'vDNS', status: 'OK' } },
    { id: 'cudb', type: 'custom', position: { x: 400, y: 600 }, data: { label: 'vCUDB', status: 'OK' } },
    { id: 'partner-rh', type: 'custom', position: { x: -500, y: 0 }, data: { label: 'Partner Rosh-Haayin', status: 'OK' } },
    { id: 'partner-rv', type: 'custom', position: { x: -500, y: 100 }, data: { label: 'Partner Rehovot', status: 'OK' } },
    { id: 'pelephone-ka', type: 'custom', position: { x: -500, y: 200 }, data: { label: 'Pelephone Kiryat-Ariye', status: 'OK' } },
    { id: 'pelephone-pt', type: 'custom', position: { x: -500, y: 300 }, data: { label: 'Pelephone Petach-Tikwa', status: 'OK' } },
    { id: 'collcom-nt', type: 'custom', position: { x: -500, y: 400 }, data: { label: 'Cellcom Netanya', status: 'OK' } },
    { id: 'collcom-oy', type: 'custom', position: { x: -500, y: 500 }, data: { label: 'Cellcom Or-Yehuda', status: 'OK' } },
    { id: 'nsbg', type: 'custom', position: { x: 700, y: 50 }, data: { label: 'vNSBG', status: 'OK' } },
    { id: 'mtas', type: 'custom', position: { x: 700, y: 150 }, data: { label: 'vMTAS', status: 'OK' } },
    { id: 'ibgf', type: 'custom', position: { x: 700, y: 250 }, data: { label: 'vIBGF', status: 'OK' } },
    { id: 'cscf', type: 'custom', position: { x: 700, y: 350 }, data: { label: 'vCSCF', status: 'OK' } },
];

const initialEdges = [
    {
        id: 'e-mme-dsc', source: 'mme', target: 'dsc',
        animated: true,
        targetHandle: 'target-top',
        sourceHandle: 'source-bottom',
        style: { stroke: '#17C964', strokeWidth: 2 },
    },

    {
        id: 'e-hss-dsc', source: 'hss', target: 'dsc',
        animated: true,
        targetHandle: 'target-bottom',
        sourceHandle: 'source-top',
        style: { stroke: '#17C964', strokeWidth: 2 },
    },

    {
        id: 'e-sapc-dsc', source: 'sapc', target: 'dsc',
        animated: true,
        targetHandle: 'target-bottom',
        sourceHandle: 'source-top',
        style: { stroke: '#17C964', strokeWidth: 2 },
    },

    {
        id: 'e-sapc-epg', source: 'sapc', target: 'epg',
        animated: true,
        targetHandle: 'target-bottom',
        sourceHandle: 'source-top',
        style: { stroke: '#17C964', strokeWidth: 2 },
    },

    {
        id: 'e-sapc-hss', source: 'sapc', target: 'hss',
        animated: true,
        targetHandle: 'target-left',
        sourceHandle: 'source-right',
        style: { stroke: '#17C964', strokeWidth: 2 },
    },

    {
        id: 'e-hss-eda', source: 'hss', target: 'eda',
        animated: true,
        targetHandle: 'target-left',
        sourceHandle: 'source-right',
        style: { stroke: '#17C964', strokeWidth: 2 },
    },

    {
        id: 'e-hss-cudb', source: 'hss', target: 'cudb',
        animated: true,
        targetHandle: 'target-left',
        sourceHandle: 'source-right',
        style: { stroke: '#17C964', strokeWidth: 2 },
    },

    {
        id: 'e-mme-dns', source: 'mme', target: 'dns',
        animated: true,
        targetHandle: 'target-left',
        sourceHandle: 'source-right',
        style: { stroke: '#17C964', strokeWidth: 2 },
    },

    {
        id: 'e-epg-dsc', source: 'epg', target: 'dsc',
        animated: true,
        targetHandle: 'target-top',
        sourceHandle: 'source-right',
        style: { stroke: '#17C964', strokeWidth: 2 },
    },

    {
        id: 'e-partner-rh-dsc', source: 'partner-rh', target: 'dsc',
        animated: true,
        targetHandle: 'target-left',
        sourceHandle: 'source-right',
        style: { stroke: '#17C964', strokeWidth: 2 },
    },

    {
        id: 'e-partner-rv-dsc', source: 'partner-rv', target: 'dsc',
        animated: true,
        targetHandle: 'target-left',
        sourceHandle: 'source-right',
        style: { stroke: '#17C964', strokeWidth: 2 },
    },

    {
        id: 'e-pelephone-ka-dsc', source: 'pelephone-ka', target: 'dsc',
        animated: true,
        targetHandle: 'target-left',
        sourceHandle: 'source-right',
        style: { stroke: '#17C964', strokeWidth: 2 },
    },

    {
        id: 'e-pelephone-pt-dsc', source: 'pelephone-pt', target: 'dsc',
        animated: true,
        targetHandle: 'target-left',
        sourceHandle: 'source-right',
        style: { stroke: '#17C964', strokeWidth: 2 },
    },

    {
        id: 'e-collcom-nt-dsc', source: 'collcom-nt', target: 'dsc',
        animated: true,
        targetHandle: 'target-left',
        sourceHandle: 'source-right',
        style: { stroke: '#17C964', strokeWidth: 2 },
    },

    {
        id: 'e-collcom-oy-dsc', source: 'collcom-oy', target: 'dsc',
        animated: true,
        targetHandle: 'target-left',
        sourceHandle: 'source-right',
        style: { stroke: '#17C964', strokeWidth: 2 },
    },

    {
        id: 'e-nsbg-dsc', source: 'nsbg', target: 'dsc',
        animated: true,
        targetHandle: 'target-right',
        sourceHandle: 'source-left',
        style: { stroke: '#17C964', strokeWidth: 2 },
    },

    {
        id: 'e-mtas-dsc', source: 'mtas', target: 'dsc',
        animated: true,
        targetHandle: 'target-right',
        sourceHandle: 'source-left',
        style: { stroke: '#17C964', strokeWidth: 2 },
    },

    {
        id: 'e-ibgf-dsc', source: 'ibgf', target: 'dsc',
        animated: true,
        targetHandle: 'target-right',
        sourceHandle: 'source-left',
        style: { stroke: '#17C964', strokeWidth: 2 },
    },

    {
        id: 'e-cscf-dsc', source: 'cscf', target: 'dsc',
        animated: true,
        targetHandle: 'target-right',
        sourceHandle: 'source-left',
        style: { stroke: '#17C964', strokeWidth: 2 },
    },
];

// --- 4. הקומפוננטה הראשית ---
export default function TopologyMap() {
    const [nodes, , onNodesChange] = useNodesState(initialNodes);
    const [edges, setEdges, onEdgesChange] = useEdgesState(initialEdges);

    return (
        <div style={{ height: '800px', width: '100%', border: '1px solid #333', borderRadius: '12px', background: '#000' }}>
            <ReactFlow
                nodes={nodes}
                edges={edges}
                nodeTypes={nodeTypes}
                onNodesChange={onNodesChange}
                onEdgesChange={onEdgesChange}
                fitView
                nodesDraggable={false}
                nodesConnectable={false}
                attributionPosition="bottom-right">
                <Background color="#333" gap={20} size={1} />
                <Controls
                    position="bottom-left"
                    style={{ display: 'flex', gap: '4px', margin: '10px' }} />
            </ReactFlow>
        </div>
    );
}