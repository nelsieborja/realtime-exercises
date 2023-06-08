nodemon: restart dev server on file update

Websocket downsides
* servers have to hold on to some state; talking to different clients is difficult to unify the comm.
EG: 3 servers, 10 clients, 1 client writes to 1 server, inform other servers, broadcast to their clients - sync data across various diff sharded servers (Redis tool)


# long polling

Make whole lot of request; make a request and see if something's new; keeps making requests over and over again

pkgs
`morgan` logging framework sse request coming in
`nanobuffer` limited array

`type: module` - set it if working in NodeJS

> client asking for the server for data


### pausing on unfocus
Why pausing is needed with polling:
server resources
CPU cycles
memory
data


Solution:
`requestAnimationFrame`
won't interrupt the browser vs setTimeout will pause everything else
pause when user unfocuses the window

### backoff and retry
"exponential" backoff strategy - make request increase delay if necessary
> retry button to manually request - product question

> General product advise: if fails, immediately try again, then wait a short time and try again; if not succeed after 3 then backoff progressively. - avoid overloading the server


# http/2 push (came out in 2015)
before: 1-to-1 relationship aka "old style" http1
after: 1-to-many response back

* better compression
* request prioritization
* long running request for sending chunked requests


http/3 (QUIC) - accuracy for speed & much more fault tolerant

Create cert
```shell
openssl req -new -newkey rsa:2048 -new -nodes -keyout key.pem -out csr.pem
openssl x509 -req -days 365 -in csr.pem -signkey key.pem -out server.crt
```

`http2`: direct standard library from Node
`serve-handler`: serving static assets created by vercel


> No way to stream json, doesnt steam very well. YAML as alternative

`res.body.getReader`: incomplete body and keep streaming open

http/2 not particularly made with this "pushing" use cases


