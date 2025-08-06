// import necessary components
import { useState } from 'react';
import { Card, CardContent } from "./components/ui/card";
import { Button } from "./components/ui/button";
import { Input } from "./components/ui/input";

// Main app component
export default function App() {
  const [challengeName, setChallengeName] = useState("");
  const [challenges, setChallenges] = useState([]);
  const [participantName, setParticipantName] = useState("");

  const createChallenge = () => {
    if (challengeName.trim()) {
      setChallenges([...challenges, { name: challengeName, participants: [], id: Date.now() }]);
      setChallengeName("");
    }
  };

  const joinChallenge = (challengeId) => {
    if (participantName.trim()) {
      const updatedChallenges = challenges.map(ch => {
        if (ch.id === challengeId) {
          return { ...ch, participants: [...ch.participants, participantName] };
        }
        return ch;
      });
      setChallenges(updatedChallenges);
      setParticipantName("");
    }
  };

  return (
    <div className="p-6 max-w-4xl mx-auto space-y-8">
      <h1 className="text-3xl font-bold text-center">StakeAndWager MVP</h1>

      <Card>
        <CardContent className="space-y-4">
          <h2 className="text-xl font-semibold">Create a New Challenge</h2>
          <Input
            placeholder="Enter challenge title (e.g., Trivia Challenge)"
            value={challengeName}
            onChange={(e) => setChallengeName(e.target.value)}
          />
          <Button onClick={createChallenge}>Create Challenge</Button>
        </CardContent>
      </Card>

      <div className="space-y-6">
        {challenges.map((challenge) => (
          <Card key={challenge.id}>
            <CardContent className="space-y-2">
              <h3 className="font-semibold text-lg">{challenge.name}</h3>
              <p>Participants: {challenge.participants.length}</p>
              <div className="flex gap-2">
                <Input
                  placeholder="Your name"
                  value={participantName}
                  onChange={(e) => setParticipantName(e.target.value)}
                />
                <Button onClick={() => joinChallenge(challenge.id)}>Join</Button>
              </div>
              {challenge.participants.length > 0 && (
                <ul className="list-disc pl-6">
                  {challenge.participants.map((p, idx) => (
                    <li key={idx}>{p}</li>
                  ))}
                </ul>
              )}
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
}
