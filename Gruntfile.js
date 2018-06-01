/*
 After you have changed the settings at "Your code goes here",
 run this with one of these options:
  "grunt" alone creates a new, completed images directory
  "grunt clean" removes the images directory
  "grunt responsive_images" re-processes images without removing the old ones
*/

module.exports = function (grunt) {

  grunt.initConfig({
    exec: {
      /**
        * Art direction handling of images. This only outputs medium and small
        *  versions of images.
        * The only large versions are the pixel density versions.
        * Udacity's index.html doesn't use '*_large.jpg' versions, though
        *  these files exist in their official solution's 'images' folder.
        *
        * Some images are resized proportionately, whereas others are cropped
        *  with art direction. Some are a combination of both.
        * As such, it is too complicated to handle using grunt task
        *  responsive_images. Moreover, `gm' is easy enough to use.
        * In any case, grunt-responsive-images is buggy, doesn't crop.
        *   See my patch at:
        *   https://github.com/andismith/grunt-responsive-images/pull/124
        */
      art_direct: {
        cmd: function() {
          var command = 'gm convert ';          
          const images = ['still_life', 'cockatoos', 'postcard', 'volt', 'rosella', 'sfo'];

          var commands = [];

          // horses.jpg is cropped with art direction.
          commands.push(command +
            '-crop 532x399+513+248 ' +
            '-resize 320 ' +
            'images_src/horses.jpg images/horses_320.jpg');
          commands.push(command +
            '-crop 736x552+415+169 ' +
            '-resize 640 ' +
            'images_src/horses.jpg images/horses_640.jpg');
          commands.push(command +
            '-resize 1280 ' +
            'images_src/horses.jpg images/horses_1280.jpg');
          commands.push(command +
            '-resize 960 ' +
            'images_src/horses.jpg images/horses_960.jpg');
          commands.push(command +
            '-resize 1920 ' +
            'images_src/horses.jpg images/horses_1920.jpg');
          
          // grasshopper.jpg is cropped with art direction.
          commands.push(command +
            '-crop 1944x1458+0+273 ' +
            '-resize 320 ' +
            'images_src/grasshopper.jpg images/grasshopper_320.jpg');
          commands.push(command +
            '-crop 1944x1458+0+273 ' +
            '-resize 640 ' +
            'images_src/grasshopper.jpg images/grasshopper_640.jpg');
          commands.push(command +
            '-crop 1944x1458+0+273 ' +
            '-resize 1280 ' +
            'images_src/grasshopper.jpg images/grasshopper_1280.jpg');
          commands.push(command +
            '-crop 1944x1458+0+273 ' +
            '-resize 960 ' +
            'images_src/grasshopper.jpg images/grasshopper_960.jpg');
          commands.push(command +
            '-crop 1944x1458+0+273 ' +
            '-resize 1920 ' +
            'images_src/grasshopper.jpg images/grasshopper_1920.jpg');
          
          for (const image of images) {
            commands.push(command +
              '-resize 320x240 ' +
              'images_src/' + image + '.jpg images/' + image + '_320.jpg');
            commands.push(command +
              '-resize 640 ' +
              'images_src/' + image + '.jpg images/' + image + '_640.jpg');
            commands.push(command +
              '-resize 1280 ' +
              'images_src/' + image + '.jpg images/' + image + '_1280.jpg');
            commands.push(command +
              '-resize 960 ' +
              'images_src/' + image + '.jpg images/' + image + '_960.jpg');
            commands.push(command +
              '-resize 1920 ' +
              'images_src/' + image + '.jpg images/' + image + '_1920.jpg');
          }
          
          return commands.join(' && ');
        }
      }
    },
/*
    responsive_images: {
      dev: {
        options: {
          sizes: [{
            name: '320',
            width: '320',
            quality: 20,
            separator: "_"
          }, {
            name: '640',
            width: '640',
            quality: 20,
            separator: "_"
          }, {
            name: '1280',
            width: '1280',
            quality: 20,
            separator: "_"
          }, {
            name: '960',
            width: '960',
            quality: 40,
            separator: "_"
          }, {
            name: '1920',
            width: '1920',
            quality: 40,
            separator: "_"
          }]
        },

        
        You don't need to change this part if you don't change
        the directory structure.
        
        files: [{
          expand: true,
          src: ['*.{gif,jpg,png}'],
          cwd: 'images_src/',
          dest: 'images/'
        }]
      }
},*/

    /* Clear out the images directory if it exists */
    clean: {
      dev: {
        src: ['images'],
      },
    },

    /* Generate the images directory if it is missing */
    mkdir: {
      dev: {
        options: {
          create: ['images']
        },
      },
    },

    /* Copy the "fixed" images that don't go through processing into the images/directory */
    // copy: {
    //   dev: {
    //     files: [{
    //       expand: true,
    //       src: 'images_src/fixed/*.{gif,jpg,png}',
    //       dest: 'images/'
    //     }]
    //   },
    // },
  });
  
  /*grunt.loadNpmTasks('grunt-responsive-images');*/
  grunt.loadNpmTasks('grunt-contrib-clean');
  // grunt.loadNpmTasks('grunt-contrib-copy');
  grunt.loadNpmTasks('grunt-mkdir');
  grunt.loadNpmTasks('grunt-exec');
  grunt.registerTask('art-direct', ['exec:art_direct']);
  grunt.registerTask('default', ['clean', 'mkdir', 'art-direct']);

};