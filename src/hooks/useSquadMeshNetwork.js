import { useState, useEffect, useRef } from 'react';
import Peer from 'peerjs';

export function useSquadMeshNetwork({ user, currentSquad, isRoadMode }) {
  const [peerId, setPeerId] = useState(null);
  const [messages, setMessages] = useState([]);
  const [connections, setConnections] = useState(new Map());
  const peerRef = useRef(null);

  useEffect(() => {
    if (!user || !currentSquad || !isRoadMode) {
      if (peerRef.current) {
        peerRef.current.destroy();
        peerRef.current = null;
        setConnections(new Map());
      }
      return;
    }

    const initPeer = async () => {
      // Use the user's ID to deterministically create a PeerJS ID for the squad
      const id = `squad-${currentSquad.id}-user-${user.id}`;
      const peer = new Peer(id, {
        debug: 2
      });

      peer.on('open', (newPeerId) => {
        setPeerId(newPeerId);
        console.log('[Mesh] Connected to PeerJS with ID:', newPeerId);
      });

      peer.on('connection', (conn) => {
        console.log('[Mesh] Incoming connection from:', conn.peer);
        setupConnection(conn);
      });

      peer.on('error', (err) => {
        console.error('[Mesh] Peer error:', err);
      });

      peerRef.current = peer;
    };

    initPeer();

    return () => {
      if (peerRef.current) {
        peerRef.current.destroy();
      }
    };
  }, [user, currentSquad, isRoadMode]);

  const setupConnection = (conn) => {
    conn.on('data', (data) => {
      setMessages((prev) => [...prev, data]);
      console.log('[Mesh] Received data:', data);
    });

    conn.on('open', () => {
      setConnections((prev) => new Map(prev).set(conn.peer, conn));
    });

    conn.on('close', () => {
      setConnections((prev) => {
        const newMap = new Map(prev);
        newMap.delete(conn.peer);
        return newMap;
      });
    });
  };

  const connectToSquadMembers = (squadMembers) => {
    if (!peerRef.current || !currentSquad || !user) return;

    squadMembers.forEach((member) => {
      if (member.id !== user.id) {
        const targetId = `squad-${currentSquad.id}-user-${member.id}`;
        if (!connections.has(targetId)) {
          console.log('[Mesh] Connecting to squad member:', targetId);
          const conn = peerRef.current.connect(targetId);
          setupConnection(conn);
        }
      }
    });
  };

  const broadcastMessage = (text) => {
    if (!user) return;
    
    const message = {
      id: Date.now().toString(),
      senderId: user.id,
      senderName: user.displayName || 'Squad Member',
      text,
      timestamp: new Date().toISOString(),
      type: 'chat'
    };

    // Add to local state
    setMessages((prev) => [...prev, message]);

    // Broadcast to all connected peers
    connections.forEach((conn) => {
      if (conn.open) {
        conn.send(message);
      }
    });
  };

  const broadcastLocation = (lat, lng) => {
    if (!user) return;

    const message = {
      id: Date.now().toString(),
      senderId: user.id,
      senderName: user.displayName || 'Squad Member',
      lat,
      lng,
      timestamp: new Date().toISOString(),
      type: 'location'
    };

    connections.forEach((conn) => {
      if (conn.open) {
        conn.send(message);
      }
    });
  };

  return {
    peerId,
    messages,
    connectedPeers: Array.from(connections.keys()),
    connectToSquadMembers,
    broadcastMessage,
    broadcastLocation
  };
}
