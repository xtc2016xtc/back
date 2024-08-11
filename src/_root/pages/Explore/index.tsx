import { useEffect, useState } from "react";
import { useInView } from "react-intersection-observer";
import { useGetPosts, useSearchPosts } from "@/lib/react-query/queries";
import Loader from "@/components/shared/Loader";
import GridPostList from "@/components/shared/GridPostList";
import { Input } from "@/components/ui/input";
import { filterIcon, searchIcon } from "@/utils";
import useDebounce from "@/hooks/useDebounce";

// 定义搜索结果组件的props类型
export type SearchResultProps = {
  isSearchFetching: boolean;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  searchedPosts: any;
};

// 搜索结果组件
const SearchResults = ({ isSearchFetching, searchedPosts }: SearchResultProps) => {
  // 如果正在搜索，则显示加载器
  if (isSearchFetching) {
    return <Loader />;
  // 如果搜索结果不为空，则显示搜索结果
  } else if (searchedPosts && searchedPosts.documents.length > 0) {
    return <GridPostList posts={searchedPosts.documents} />;
  // 否则显示没有找到结果
  } else {
    return (
      <p className="text-light-4 mt-10 text-center w-full">No results found</p>
    );
  }
};

// 探索组件
const Explore = () => {
  // 使用useInView钩子获取ref和inView状态
  const { ref, inView } = useInView();
  // 使用useGetPosts钩子获取帖子数据
  const { data: posts, fetchNextPage, hasNextPage } = useGetPosts();

  // 定义搜索值和防抖搜索值的状态
  const [searchValue, setSearchValue] = useState("");
  const debouncedSearch = useDebounce(searchValue, 500);
  // 使用useSearchPosts钩子获取搜索结果
  const { data: searchedPosts, isFetching: isSearchFetching } = useSearchPosts(debouncedSearch);

  // 当inView为true且没有搜索值时，调用fetchNextPage函数
  useEffect(() => {
    if (inView && !searchValue) {
      fetchNextPage();
    }
  }, [fetchNextPage, inView, searchValue]);

  // 如果没有帖子数据，则显示加载器
  if (!posts)
    return (
      <div className="flex-center w-full h-full">
        <Loader />
      </div>
    );

  // 定义是否显示搜索结果和是否显示帖子的状态
  const shouldShowSearchResults = searchValue !== "";
  const shouldShowPosts = !shouldShowSearchResults && 
    posts.pages.every((item) => item.documents.length === 0);

  return (
    <div className="explore-container">
      <div className="explore-inner_container">
        <h2 className="h3-bold md:h2-bold w-full">Search Posts</h2>
        <div className="flex gap-1 px-4 w-full rounded-lg bg-dark-4">
          <img
            src={searchIcon}
            width={24}
            height={24}
            alt="search"
          />
          <Input
            type="text"
            placeholder="Search"
            className="explore-search"
            value={searchValue}
            onChange={(e) => {
              const { value } = e.target;
              setSearchValue(value);
            }}
          />
        </div>
      </div>

      <div className="flex-between w-full max-w-5xl mt-16 mb-7">
        <h3 className="body-bold md:h3-bold">Popular Today</h3>

        <div className="flex-center gap-3 bg-dark-3 rounded-xl px-4 py-2 cursor-pointer">
          <p className="small-medium md:base-medium text-light-2">All</p>
          <img
            src={filterIcon}
            width={20}
            height={20}
            alt="filter"
          />
        </div>
      </div>

      <div className="flex flex-wrap gap-9 w-full max-w-5xl">
        {shouldShowSearchResults ? (
          <SearchResults
            isSearchFetching={isSearchFetching}
            searchedPosts={searchedPosts}
          />
        ) : shouldShowPosts ? (
          <p className="text-light-4 mt-10 text-center w-full">End of posts</p>
        ) : (
          posts.pages.map((item, index) => (
            <GridPostList key={`page-${index}`} posts={item.documents} />
          ))
        )}
      </div>

      {hasNextPage && !searchValue && (
        <div ref={ref} className="mt-10">
          <Loader />
        </div>
      )}
    </div>
  );
};

export default Explore;