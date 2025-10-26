import { useState, useEffect } from "react";
import { Trophy, TrendingDown, CheckCircle, XCircle } from "lucide-react";

interface User {
  id: number;
  name: string;
  username: string;
}

interface Post {
  userId: number;
  id: number;
  title: string;
}

interface Todo {
  userId: number;
  id: number;
  title: string;
  completed: boolean;
}

interface UserStats {
  userId: number;
  username: string;
  name: string;
  postCount: number;
  completedTodoCount: number;
}

async function fetchUserStats(): Promise<{
  mostPosts: UserStats;
  fewestPosts: UserStats;
  mostCompletedTodos: UserStats;
  fewestCompletedTodos: UserStats;
}> {
  const [users, posts, todos] = await Promise.all([
    fetch('https://jsonplaceholder.typicode.com/users').then(res => res.json()),
    fetch('https://jsonplaceholder.typicode.com/posts').then(res => res.json()),
    fetch('https://jsonplaceholder.typicode.com/todos').then(res => res.json())
  ]);

  const userStatsMap = new Map<number, UserStats>();

  users.forEach((user: User) => {
    userStatsMap.set(user.id, {
      userId: user.id,
      username: user.username,
      name: user.name,
      postCount: 0,
      completedTodoCount: 0
    });
  });

  posts.forEach((post: Post) => {
    const stats = userStatsMap.get(post.userId);
    if (stats) {
      stats.postCount++;
    }
  });

  todos.forEach((todo: Todo) => {
    const stats = userStatsMap.get(todo.userId);
    if (stats && todo.completed) {
      stats.completedTodoCount++;
    }
  });

  const statsArray = Array.from(userStatsMap.values());

  const mostPosts = statsArray.reduce((max, user) => 
    user.postCount > max.postCount ? user : max
  );

  const fewestPosts = statsArray.reduce((min, user) => 
    user.postCount < min.postCount ? user : min
  );

  const mostCompletedTodos = statsArray.reduce((max, user) => 
    user.completedTodoCount > max.completedTodoCount ? user : max
  );

  const fewestCompletedTodos = statsArray.reduce((min, user) => 
    user.completedTodoCount < min.completedTodoCount ? user : min
  );

  return {
    mostPosts,
    fewestPosts,
    mostCompletedTodos,
    fewestCompletedTodos
  };
}

export default function UserStatsCard() {
  const [data, setData] = useState<{
    mostPosts: UserStats;
    fewestPosts: UserStats;
    mostCompletedTodos: UserStats;
    fewestCompletedTodos: UserStats;
  } | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<Error | null>(null);

  useEffect(() => {
    fetchUserStats()
      .then(stats => {
        setData(stats);
        setIsLoading(false);
      })
      .catch(err => {
        setError(err);
        setIsLoading(false);
      });
  }, []);

  if (isLoading) {
    return (
      <div className="card min-w-[200px] w-full bg-base-200 shadow-md rounded-2xl border border-gray-200 p-10 my-5">
        <div className="flex items-center justify-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-purple-600"></div>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="card min-w-[200px] w-full bg-base-200 shadow-md rounded-2xl border border-gray-200 p-10 my-5">
        <div className="text-center text-red-600">
          <p className="font-semibold">Failed to load statistics</p>
          <p className="text-sm mt-2">{error.message}</p>
        </div>
      </div>
    );
  }

  if (!data) return null;

  const StatItem = ({ icon: Icon, title, username, count, variant }: {
    icon: any;
    title: string;
    username: string;
    count: number;
    variant: 'success' | 'warning';
  }) => (
    <div className={`p-4 rounded-lg ${variant === 'success' ? 'bg-green-50 border border-green-200' : 'bg-orange-50 border border-orange-200'}`}>
      <div className="flex items-start gap-3">
        <Icon className={`w-6 h-6 flex-shrink-0 ${variant === 'success' ? 'text-green-600' : 'text-orange-600'}`} />
        <div className="flex-1">
          <h3 className="font-semibold text-sm text-gray-700 mb-1">{title}</h3>
          <p className="text-lg font-bold text-gray-900">@{username}</p>
          <p className="text-sm text-gray-600 mt-1">{count} items</p>
        </div>
      </div>
    </div>
  );

  return (
    <div className="card min-w-[200px] w-full bg-base-200 shadow-md hover:shadow-xl transition duration-300 rounded-2xl border border-gray-200 p-8 my-5 max-w-2xl">
      <h2 className="text-2xl font-bold mb-6 text-gray-800">User Statistics</h2>
      
      <div className="space-y-6">
        <div>
          <h3 className="text-lg font-semibold mb-3 text-gray-700 flex items-center gap-2">
            <Trophy className="w-5 h-5 text-purple-600" />
            Posts Statistics
          </h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <StatItem
              icon={Trophy}
              title="Most Posts"
              username={data.mostPosts.username}
              count={data.mostPosts.postCount}
              variant="success"
            />
            <StatItem
              icon={TrendingDown}
              title="Fewest Posts"
              username={data.fewestPosts.username}
              count={data.fewestPosts.postCount}
              variant="warning"
            />
          </div>
        </div>

        <div>
          <h3 className="text-lg font-semibold mb-3 text-gray-700 flex items-center gap-2">
            <CheckCircle className="w-5 h-5 text-purple-600" />
            Completed Todos Statistics
          </h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <StatItem
              icon={CheckCircle}
              title="Most Completed Todos"
              username={data.mostCompletedTodos.username}
              count={data.mostCompletedTodos.completedTodoCount}
              variant="success"
            />
            <StatItem
              icon={XCircle}
              title="Fewest Completed Todos"
              username={data.fewestCompletedTodos.username}
              count={data.fewestCompletedTodos.completedTodoCount}
              variant="warning"
            />
          </div>
        </div>
      </div>
    </div>
  );
}