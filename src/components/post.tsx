import Image from 'next/image'

export function Post({ post }) {
	return (
		<article className="flex max-w-xl flex-col items-start justify-between">
			<div className="flex items-center gap-x-4 text-xs">
				<time className="text-gray-500">{post.date}</time>
				<a href="#" className="relative z-10 rounded-full bg-gray-50 px-3 py-1.5 font-medium text-gray-600 hover:bg-gray-100">{post.tag}</a>
			</div>
			<div className="group relative">
				<h3 className="mt-3 text-lg/6 font-semibold text-gray-900 group-hover:text-gray-600">
					<a href="#">
						<span className="absolute inset-0"></span>
						{post.title}
					</a>
				</h3>
				<p className="mt-5 line-clamp-3 text-sm/6 text-gray-600">{post.abstract}</p>
			</div>
			<div className="relative mt-8 flex items-center gap-x-4">
				<Image src="https://images.unsplash.com/photo-1519244703995-f4e0f30006d5?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80" alt="" className="size-10 rounded-full bg-gray-50" width={10} height={10} />
				<div className="text-sm/6">
					<p className="font-semibold text-gray-900">
						<a href="#">
							<span className="absolute inset-0"></span>
							{post.author.name}
						</a>
					</p>
					<p className="text-gray-600">{post.author.job}</p>
				</div>
			</div>
		</article>
	)
};

export function PostSection({ posts }) {
	console.log(posts);
	return (
		<div className="mx-auto mt-10 grid max-w-2xl grid-cols-1 gap-x-8 gap-y-16 border-t border-gray-200 pt-10 sm:mt-16 sm:pt-16 lg:mx-0 lg:max-w-none lg:grid-cols-3">
			{posts.map((post) => (
				<Post key={post.id} post={post}></Post>
			))}
		</div>
	)
};