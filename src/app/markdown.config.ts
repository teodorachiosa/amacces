import { MarkedOptions, MarkedRenderer } from 'ngx-markdown';

export function markedOptionsFactory(): MarkedOptions {
  const renderer = new MarkedRenderer();

  //     renderer.blockquote = ({ tokens }) => {
  //     return (
  //       '<blockquote class="blockquote"><p>' +
  //       Parser.parse(tokens) +
  //       '</p></blockquote>'
  //     );
  //   };

  renderer.link = ({ href, text }) => {
    return href.includes('|blank')
      ? `<a target="_blank" href="${
          href.split('|')[0]
        }">${text} <span class="visually-hidden">(deschide filă nouă)</span></a>`
      : `<a href="${href.split('|')[0]}">${text}</a>`;
  };

  return {
    renderer: renderer,
    gfm: true,
    breaks: true,
    pedantic: false
  };
}
