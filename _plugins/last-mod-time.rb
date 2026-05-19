Jekyll::Hooks.register :pages, :pre_render do |page|
  
  if File.exist?(page.path)

    # get the page's last modified time
    modification_time = File.mtime( page.path )

    # inject modification_time into page's data.
    page.data['last-mod-time'] = modification_time
  end

end

Jekyll::Hooks.register :posts, :pre_render do |post|
  
  if File.exist?(post.path)

    # get the post's last modified time
    modification_time = File.mtime( post.path )

    # inject modification_time into post's data.
    post.data['last-mod-time'] = modification_time
  end

end
