require 'rubygems'
require 'yaml'
require 'term/ansicolor'

deploy_dir = '_deploy'
deploy_branch = 'gh-pages'

jekyll_rb = Pathname.new(File.join(Gem.bindir, 'jekyll')).relative_path_from(Pathname.pwd).to_path

desc "Setup for deployment"
task :setup, :deploy_site do |t, args|
  raise 'deploy_site is not specified' unless args.deploy_site

  if File.exists?(deploy_dir)
    remove_entry_secure(deploy_dir, :force => true)
  end
  ok_failed system "git clone \'#{args.deploy_site}\' \'#{deploy_dir}\'"
end

desc "Generate jekyll site"
task :generate do
  system "ruby #{jekyll_rb} build #{ENV['JEKYLL_ARGS']}"
end

desc "Validates _site/"
task :validate do
  require 'rexml/document'

  ng_count = 0
  ok_count = 0
  Dir.glob('_site/**/*.html') do |file|
    begin
      File.open(file, 'r') { |f| REXML::Document.new(f) }
      ok_count = ok_count.succ
    rescue REXML::ParseException => ex
      puts "#{Term::ANSIColor::red}#{Term::ANSIColor::bold}NG#{Term::ANSIColor::clear} #{file}(#{ex.line}:#{ex.position}): #{ex.message.split(/\n/).first}\n"
      ng_count = ng_count.succ
    end
  end
  puts "#{Term::ANSIColor::green}OK:#{ok_count} #{Term::ANSIColor::red}NG:#{ng_count}#{Term::ANSIColor::clear}\n"
  raise 'Not valid' if ng_count > 0
end

desc "Deploy to github.io"
task :deploy do
  #Rake::Task[:generate].execute

  cd "#{deploy_dir}" do
    puts "git pull in #{deploy_dir}... "
    ok_failed system "git pull origin \'#{deploy_branch}\'"
  end

  puts "\nCopy to _site/ to #{deploy_dir}... "
  ok_failed system("rsync -a --delete --exclude .git _site/ \'#{deploy_dir}\'")

  if ENV['TRAVIS_BRANCH'] == 'master'
    cd "#{deploy_dir}" do
      FileUtils.touch '.nojekyll' unless File.exists?('.nojekyll')

      message = "Site updated at #{Time.now.utc}"
      puts "Commiting: #{message}"

      ok_failed system("git add -A")
      ok_failed system("git commit -m \"#{message}\"")
      ok_failed system("git push origin \'#{deploy_branch}\'")
    end
  end

end

def ok_failed(condition)
  if (condition)
    puts "#{Term::ANSIColor::green}#{Term::ANSIColor::bold}OK#{Term::ANSIColor::clear}"
  else
    puts "#{Term::ANSIColor::red}#{Term::ANSIColor::bold}FAILED#{Term::ANSIColor::clear}"
  end
end

def get_stdin(message)
  print message
  STDIN.gets.chomp
end
def ask(message, valid_options)
  if valid_options
    answer = get_stdin("#{message} #{valid_options.to_s.gsub(/"/, '').gsub(/, /,'/')} ") while !valid_options.include?(answer)
  else
    answer = get_stdin(message)
  end
  answer
end
class String
  def to_url
    self.gsub('&', ' and ').gsub(/[^\w\-\s]/, '').strip.gsub(/\s+/, '-').downcase
  end
end
