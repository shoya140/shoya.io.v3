module Jekyll

  class CategoryPage < Page
    def initialize(site, base, dir, category)
      @site, @base, @dir = site, base, dir
      @name = 'index.html'

      self.process(@name)
      raise 'name is null' unless @name
      self.read_yaml(File.join(base, '_layouts'), 'entries.html')
      self.data['posts'] = site.categories[category]
      self.data['category'] = category
    end
  end

  class CategoryPageGenerator < Generator
    safe true

    def generate(site)
      site.categories.keys.each do |category|
        site.pages << CategoryPage.new(site, site.source, File.join('category', category), category)
      end
    end
  end
end
